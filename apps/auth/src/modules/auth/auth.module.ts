import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE, MAIL_SERVICE } from '@app/common/constants';
import { AuthService } from './auth.service';
import { CacheModule } from '@app/common/cache';
import {
    Auth,
    AuthSchema,
    EmailVerificationTemp,
    EmailVerificationTempSchema,
    ResetPasswordTemp,
    ResetPasswordTempSchema,
} from './schemas';
import {
    AuthRepository,
    EmailVerificationTempRepository,
    ResetPasswordTempRepository,
} from './repositories';
import { RmqModule } from '@app/common/rmq';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: JWT_EXPIRE },
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: Auth.name, schema: AuthSchema },
            { name: EmailVerificationTemp.name, schema: EmailVerificationTempSchema },
            { name: ResetPasswordTemp.name, schema: ResetPasswordTempSchema },
        ]),
        RmqModule.register([MAIL_SERVICE]),
        CacheModule.register(),
    ],
    providers: [
        AuthService,
        AuthRepository,
        EmailVerificationTempRepository,
        ResetPasswordTempRepository,
    ],
    controllers: [],
    exports: [AuthService]
})
export class AuthModule { }
