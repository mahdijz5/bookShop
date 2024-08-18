import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ValidateTokenDto } from '@app/common/dto/auth';
 
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        protected readonly configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
            jwtFromRequest: (req: ValidateTokenDto) => req.jwtToken,
        });
    }

    async validate(payload) {
        return payload;  
    }
}
