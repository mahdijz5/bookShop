import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ValidateTokenDto } from '@app/common/dto/auth';
import { AuthRepository } from '../modules/auth/repositories';
import { CacheService } from '@app/common/cache';
import { ERROR } from '@app/common';
import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        protected readonly configService: ConfigService,
        private readonly authRepository: AuthRepository,
        private readonly cacheService: CacheService,
    ) {
        super({
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
            jwtFromRequest: (req: ValidateTokenDto) => req.jwtToken,
        });
    }

    async validate(payload) {
        const jwtData = await this.cacheService.getObj(payload.key);
        return jwtData 
    }
}
