import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
    EmailPreRegisterReqDto,
    EmailResendPreRegisterVerificationReqDto,
    EmailVerifyReqDto,
    EmailRegisterReqDto,
    EmailRegisterResDto,
    LoginReqDto,
    LoginResDto,
    GetUserInformationReqDto,

    EmailVerifyResDto,
    ResetPasswordReqDto,
    EmailUpdatePasswordReqDto,

} from '@app/common/dto/auth';
import { JWTData } from '@app/common';
import { JWTGuard } from '../../guards';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(JWTGuard)
    @MessagePattern('validate-token')
    async validateToken(@JWTData() jwtData) {
        return jwtData;
    }



    @MessagePattern('emailPreRegister')
    async emailPreRegister(@Payload() emailPreRegisterReqDto: EmailPreRegisterReqDto) {
        return this.authService.emailPreRegister(
            emailPreRegisterReqDto.fp,
            emailPreRegisterReqDto.ip,
            emailPreRegisterReqDto.email,
        );
    }


    @MessagePattern('emailResendPreRegisterVerification')
    async emailResendVerification(
        @Payload()
        emailResendPreRegisterVerificationReqDto: EmailResendPreRegisterVerificationReqDto,
    ) {
        return this.authService.emailResendPreRegisterVerification(
            emailResendPreRegisterVerificationReqDto.fp,
            emailResendPreRegisterVerificationReqDto.ip,
            emailResendPreRegisterVerificationReqDto.email,
        );
    }


    @MessagePattern('emailVerify')
    async emailVerify(@Payload() emailVerifyReqDto: EmailVerifyReqDto): Promise<EmailVerifyResDto> {
        return this.authService.emailVerify(
            emailVerifyReqDto.fp,
            emailVerifyReqDto.ip,
            emailVerifyReqDto.code,
        );
    }


    @MessagePattern('emailRegister')
    async emailRegister(
        @Payload() emailRegisterReqDto: EmailRegisterReqDto,
    ): Promise<EmailRegisterResDto> {
        return this.authService.emailRegister(
            emailRegisterReqDto.id,
            emailRegisterReqDto.ip,
            emailRegisterReqDto.fp,
            emailRegisterReqDto.password,
            emailRegisterReqDto.username,

        );
    }

    @MessagePattern('login')
    async login(@Payload() loginReqDto: LoginReqDto): Promise<LoginResDto> {
        return this.authService.login(
            loginReqDto.username,
            loginReqDto.password,
        );
    }

    @MessagePattern('getUserInformation')
    async getUserInformation(@Payload() getUserInformationReqDto: GetUserInformationReqDto) {
        return this.authService.getUserInformation(getUserInformationReqDto.id);
    }





    @MessagePattern('emailResetPassword')
    async emailResetPassword(@Payload() emailResetPasswordReqDto: ResetPasswordReqDto) {
        return this.authService.emailResetPassword(
            emailResetPasswordReqDto.fp,
            emailResetPasswordReqDto.ip,
            emailResetPasswordReqDto.email,
        );
    }


    @MessagePattern('emailUpdatePassword')
    async emailUpdatePassword(@Payload() emailUpdatePasswordReqDto: EmailUpdatePasswordReqDto) {
        return this.authService.emailUpdatePassword(
            emailUpdatePasswordReqDto.fp,
            emailUpdatePasswordReqDto.ip,
            emailUpdatePasswordReqDto.code,
            emailUpdatePasswordReqDto.password, 
        );
    }
 
 

   
 
}
