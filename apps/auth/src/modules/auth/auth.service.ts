import { ClientProxy } from '@nestjs/microservices';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { Types } from 'mongoose';
import * as mailDtos from '@app/common/dto/mail';
import { AUTH_SERVICE, JWT_EXPIRE, MAIL_SERVICE, PACKAGE_SERVICE, VERIFICATION_TEMP_EXPIRE_TIME } from '@app/common/constants';
import { comparePassword, genHash, genRandomNum, genRandomNumCode, genRandomString, hashPassword } from '../../utils';
import { ERROR, UserStatus } from '@app/common';
import { HandleError } from '@app/common/helpers';
import { CacheService } from '@app/common/cache';

import {
    AuthRepository,
    EmailVerificationTempRepository,

    ResetPasswordTempRepository,
} from './repositories';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { CreateCartReqDto } from '@app/common/dto';

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);
 
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly cacheService: CacheService,
        @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
        @Inject(PACKAGE_SERVICE) private readonly packageClient: ClientProxy,
        private readonly authRepository: AuthRepository,
        private readonly emailVerificationTempRepository: EmailVerificationTempRepository,
        private readonly resetPasswordTempRepository: ResetPasswordTempRepository,
    ) { }



    async sendVerifySignToken(email: string, ip: string, fp: string) {
        try {


            const user = await this.authRepository.findOne({
                email
            })

            const token = genRandomNumCode(6)
            const temp = await this.emailVerificationTempRepository.save({
                authId: user._id,
                code: token,
                ip,
                fp,
            })
            await this.mailClient.emit("validate-sign", <mailDtos.EmailVerificationDto>{
                email: user.email,
                expire: moment().add(VERIFICATION_TEMP_EXPIRE_TIME, "seconds").toDate(),
                subject: "Validate sign",
                token
            })
            return token
        } catch (error) {
            new HandleError(error)
        }
    }

    async verifySignToken(token: string) {
        try {

            const verificationTemp = await this.emailVerificationTempRepository.findOne({
                code: token,
            });
            if (!verificationTemp) {
                return false
            }
            const auth = await this.authRepository.updateOne(
                { _id: verificationTemp.authId },
                { emailVerified: true },
            );

            await verificationTemp.deleteOne();


            return {

            };
        } catch (error) {
            new HandleError(error)
        }
    }

    async handleEmailVerification(
        authId: Types.ObjectId,
        fp: string,
        ip: string,
        email: string,
        callbackUrl?: string,
    ) {
        const code = genHash();

        await this.emailVerificationTempRepository.save({
            ip,
            fp,
            code,
            authId,
        });

        const token = `${code}`;
        const expire = moment().add(VERIFICATION_TEMP_EXPIRE_TIME, 'seconds').toDate();
        this.mailClient.emit<void, mailDtos.EmailVerificationDto>('email-verification', {
            email,
            subject: 'Email verification',
            token,
            expire,
        });

        return code
    }



    private async handleForgotPasswordEmail(
        authId: Types.ObjectId,
        fp: string,
        ip: string,
        email: string,
    ) {
        const code = genRandomString();

        await this.resetPasswordTempRepository.save({
            authId,
            fp,
            ip,
            code,
        });

        const forgotPasswordURL = this.configService.getOrThrow('FORGOT_PASSWORD_URL');
        const token = `${forgotPasswordURL}${code}`;
        const expire = moment().add(VERIFICATION_TEMP_EXPIRE_TIME, 'seconds').toDate();
        this.mailClient.emit<void, mailDtos.EmailVerificationDto>('email-verification', {
            email,
            subject: 'Verify Forgot Password',
            token,
            expire,
        });
        return { token, expire }
    }
 
    private async signToken(data: Record<string, string>) {
        const key = genRandomString();
        await this.cacheService.setObj(key, data, JWT_EXPIRE);
        const token = this.jwtService.sign({ key });

        return token;
    }



    async emailPreRegister(fp: string, ip: string, email: string, callbackUrl?: string): Promise<{ code: string }> {
        try {
            let auth = await this.authRepository.findOne({ email }, {})
            console.log(auth)
            const date = moment().toDate()
            if (auth) {  
                if (moment(date).diff(auth?.resendDate || date, "seconds") <= 30) {
                    throw new BadRequestException(ERROR.VERIFICATION_CODE_NOT_EXPIRED)
                }
            }

            if (!auth) {
                auth = await this.authRepository.save({ ip, email });
            } else if (auth && auth.password && auth.username) {
                throw new BadRequestException(ERROR.ALREADY_EXISTS)
            } 


            await this.authRepository.updateOne({ _id: auth._id }, { resendDate: date })
            let code = await this.handleEmailVerification(auth._id, fp, ip, email, callbackUrl);

            return { code };
        } catch (error) {
            new HandleError(error);
        }
    }


    async emailResendPreRegisterVerification(fp: string, ip: string, email: string) {
        try {
            const auth = await this.authRepository.findOne({ email });

            if (!auth) {
                throw new BadRequestException(ERROR.NOT_FOUND);
            }

            if (auth.emailVerified === true) {
                throw new BadRequestException(ERROR.USER_EMAIL_ALREADY_VERIFIED);
            }

            const verificationTemp = await this.emailVerificationTempRepository.findOne({
                authId: auth._id,
            });
            if (verificationTemp) {
                throw new BadRequestException(ERROR.VERIFICATION_CODE_NOT_EXPIRED);
            }

            await this.handleEmailVerification(auth._id, fp, ip, email);

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }


    async emailVerify(fp: string, ip: string, code: string) {
        try {
            const verificationTemp = await this.emailVerificationTempRepository.findOneOrFail({
                fp,
                ip,
                code,
            });

            const auth = await this.authRepository.updateOne(
                { _id: verificationTemp.authId },
                { emailVerified: true },
            );

            await verificationTemp.deleteOne();



            const token = await this.signToken({ userId: auth._id.toString() });

            return {
                token,
            };
        } catch (error) {
            new HandleError(error);
        }
    }



    async emailRegister(
        id: string,
        ip: string,
        fp: string,
        password: string,
        user1?: string,
        referral?: string,
        phone?: string,
    ) {
        try {
            console.log(id)
            const auth = await this.authRepository.findOne({
                _id: new Types.ObjectId(id),
            });

            let username = user1 || auth.email.split("@")[0];

            auth.ip = ip;
            auth.username = username

            const isUsernameTaken = await this.authRepository.findOne({ username });
            if (isUsernameTaken) {
                throw new BadRequestException(ERROR.USERNAME_ALREADY_EXISTS);
            }
            
            
            auth.password = await hashPassword(password);
            
            await auth.save();
            
            await lastValueFrom(this.packageClient.send("cart.create",<CreateCartReqDto>{userId : auth._id+""}))
            const loginRes = await this.login(username, password)

            return {
                email: auth.email,
                ...loginRes
            };
        } catch (error) {
            new HandleError(error);
        }
    }



    async login(username: string, password: string) {
        try {


            const auth = await this.authRepository.findOne({
                $and: [
                    { username },
                    { emailVerified: true },
                ],
            });
            if (!auth || !auth?.password) {
                throw new BadRequestException(ERROR.INVALID_CREDENTIALS);
            }

            const isPasswordMatch = await comparePassword(password, auth.password);
            if (!isPasswordMatch) {
                throw new BadRequestException(ERROR.INVALID_CREDENTIALS);
            }

            const token = await this.signToken({ userId: auth._id.toString() });
            const roles = []

            return {
                token,
                roles,
            };
        } catch (error) {
            new HandleError(error);
        }
    }

    async getUserInformation(id: string) {
        try {
            return await this.authRepository.findOneOrFail(
                { _id: new Types.ObjectId(id) },
                {
                    _id: true,
                    email: true,
                    username: true,
                    emailVerified: true,
                },
                { lean: true },
            );



        } catch (error) {
            new HandleError(error);
        }
    }

    async emailResetPassword(fp: string, ip: string, email: string) {
        try {
            const auth = await this.authRepository.findOneOrFail({
                email,
                username: { $ne: null },
            });

            const isVerificationTempAlreadyExists = await this.resetPasswordTempRepository.findOne({
                authId: auth._id,
            });
            if (isVerificationTempAlreadyExists) {
                throw new BadRequestException(ERROR.VERIFICATION_CODE_NOT_EXPIRED);
            }

            const detail = await this.handleForgotPasswordEmail(auth._id, fp, ip, email);



            return {};
        } catch (error) {
            new HandleError(error);
        }
    }



    async emailUpdatePassword(
        fp: string,
        ip: string,
        code: string,
        password: string
    ) {
        try {
            const verificationTemp = await this.resetPasswordTempRepository.findOneOrFail({
                code,
            });

            const hashedPassword = await hashPassword(password);
            const auth = await this.authRepository.updateOne(
                { _id: verificationTemp.authId },
                { password: hashedPassword },
            );


            await verificationTemp.deleteOne();

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

}
