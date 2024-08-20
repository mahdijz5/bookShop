import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Ip,
    Param,
    Patch,
    Post,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AUTH_SERVICE, REQUEST_TIMEOUT } from '@app/common/constants';
import { JWTData } from '@app/common/decorators';
import { ApiFindOneResponse, ApiObjectResponse, Public, SkipRole } from '../../common/decorators';
import {
    EmailVerifyReqDto,
    LoginReqDto,
    LoginResDto,
    GetUserInformationReqDto,
    GetUserInformationResDto,
    EmailUpdatePasswordReqDto,
    EmailVerifyResDto,
    EmailPreRegisterReqDto,
    EmailResendPreRegisterVerificationReqDto,
    EmailRegisterResDto,
    EmailRegisterReqDto,
    ResetPasswordReqDto,

} from '@app/common/dto/auth';
import { FastifyRequest } from 'fastify';
import {
    EmailResetPasswordDto,
    EmailUpdatePasswordDto,
    EmailVerifyDto,
    EmailVerifyResultDto,
    GetUserInformationResultDto,
    LoginDto,
    LoginResultDto,
    PreRegisterDto,
    RegisterDto,
    RegisterResultDto,
    ResendPreRegisterVerificationDto,
} from './dto';

import { ApiBadRequestResponseDto, EmptySuccessResponseDto, ObjectIdDto } from '../../common/dto';
import { ERROR } from '@app/common';
import { JwtDataInterface } from '../../common/interface';
import { AddRoleRequestDto } from '@app/common/dto/role/role';

@ApiTags('Auth')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
    ) { }



    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('pre-register')
    async preRegister(
        @Body() preRegisterDto: PreRegisterDto,
        @Req() req: FastifyRequest,
        @Ip() ip: string,
    ) {
       
        return this.authClient
            .send<void, EmailPreRegisterReqDto>('emailPreRegister', {
                fp: req['fingerprint'],
                ip,
                email: preRegisterDto.email,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('pre-register/resend')
    resendPreRegisterVerification(
        @Body() resendPreRegisterVerificationDto: ResendPreRegisterVerificationDto,
        @Req() req: FastifyRequest,
        @Ip() ip: string,
    ) {
        return this.authClient
            .send<void, EmailResendPreRegisterVerificationReqDto>(
                'emailResendPreRegisterVerification',
                {
                    fp: req['fingerprint'],
                    ip,
                    email: resendPreRegisterVerificationDto.email,
                },
            )
            .pipe(timeout(REQUEST_TIMEOUT));
    }


    @ApiObjectResponse(HttpStatus.OK, EmailVerifyResultDto)
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('verify/email')
    emailVerify(
        @Body() emailVerifyDto: EmailVerifyDto,
        @Req() req: FastifyRequest,
        @Ip() ip: string,
    ) {
        return this.authClient
            .send<EmailVerifyResDto, EmailVerifyReqDto>('emailVerify', {
                fp: req['fingerprint'],
                ip,
                code: emailVerifyDto.code
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiObjectResponse(HttpStatus.CREATED, RegisterResultDto)
    @SkipRole()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signup(
        @Body() registerDto: RegisterDto,
        @Ip() ip: string,
        @Req() req: FastifyRequest,
        @JWTData() jwtData: any,
    ) {
        return this.authClient
            .send<EmailRegisterResDto, EmailRegisterReqDto>('emailRegister', {
                id: jwtData.userId,
                ip,
                fp: req['fingerprint'],
                username: registerDto.username,
                password: registerDto.password,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }



    @ApiObjectResponse(HttpStatus.OK, LoginResultDto)
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authClient
            .send<LoginResDto, LoginReqDto>('login', {
                username: loginDto.username,
                password: loginDto.password,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiFindOneResponse(GetUserInformationResultDto)
    @SkipRole()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Get('me')
    getUserInformation(@JWTData() jwtData: any) {
        if (jwtData.isTemp == "true") throw new UnauthorizedException(ERROR.JWT_IS_NOT_VALID)
        return this.authClient
            .send<GetUserInformationResDto, GetUserInformationReqDto>('getUserInformation', {
                id: jwtData.userId,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }



    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('password/reset/email')
    emailResetPassword(
        @Body() emailResetPasswordDto: EmailResetPasswordDto,
        @Req() req: FastifyRequest,
        @Ip() ip: string,
    ) {
        return this.authClient
            .send<void, ResetPasswordReqDto>('emailResetPassword', {
                fp: req['fingerprint'],
                ip,
                email: emailResetPasswordDto.email,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiNoContentResponse({ type: EmptySuccessResponseDto })
    @Public()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('password/update/email')
    emailUpdatePassword(
        @Body() emailUpdatePasswordDto: EmailUpdatePasswordDto,
        @Req() req: FastifyRequest,
        @Ip() ip: string,
    ) {
        return this.authClient
            .send<void, EmailUpdatePasswordReqDto>('emailUpdatePassword', {
                fp: req['fingerprint'],
                ip,
                code: emailUpdatePasswordDto.code,
                password: emailUpdatePasswordDto.password,
                userAgent: req.headers['user-agent'],
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }




    @SkipRole()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('add-role:id')
    addRole(@Param() objectIdDto: ObjectIdDto, @JWTData() jwtData: JwtDataInterface) {
        return this.authClient
        .send<void, AddRoleRequestDto>('add-role', {
            roleId: objectIdDto.id,
            userId: jwtData.userId
        })
        .pipe(timeout(REQUEST_TIMEOUT));
    }
}
