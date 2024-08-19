import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE, MAIL_SERVICE, PACKAGE_SERVICE } from '@app/common/constants';
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
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@app/common';

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
        DatabaseModule.forFeature([
            { name: Auth.name, schema: AuthSchema },
            { name: EmailVerificationTemp.name, schema: EmailVerificationTempSchema },
            { name: ResetPasswordTemp.name, schema: ResetPasswordTempSchema },
        ]),
        RmqModule.register([MAIL_SERVICE,PACKAGE_SERVICE]),
        CacheModule.register(),
    ],
    providers: [
        AuthService,
        AuthRepository,
        EmailVerificationTempRepository,
        ResetPasswordTempRepository,
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
