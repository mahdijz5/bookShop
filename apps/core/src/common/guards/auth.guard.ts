import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { AUTH_SERVICE } from '@app/common/constants';
import { ValidateTokenDto } from '@app/common/dto/auth';
import { ERROR } from '@app/common';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    constructor(
        @Inject(AUTH_SERVICE) private authClient: ClientProxy,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const token = this.getToken(context);
        const jwtData = await this.validateToken(token);
        context.switchToHttp().getRequest().jwtData = jwtData;

        const skipRole = this.reflector.getAllAndOverride('skipRole', [
            context.getHandler(),
            context.getClass(),
        ])
 
        if (skipRole) {
            return true;
        }

        if (!jwtData.hasOwnProperty('routingsKey')) {
            throw new BadRequestException(ERROR.JWT_IS_NOT_VALID);
        }
        await this.checkRole(jwtData['routingsKey'], context);

        return true;
    }

    private getToken(context: ExecutionContext) {
        const token = context.switchToHttp().getRequest<FastifyRequest>().headers.authorization;
        if (!token) {
            throw new BadRequestException(ERROR.JWT_NOTFOUND);
        }
        return token;
    }

    private async validateToken(token: string) {
        const jwtData = await firstValueFrom(
            this.authClient
                .send<Object, ValidateTokenDto>('validate-token', {
                    jwtToken: token.split(' ')[1],
                })
                .pipe(
                    catchError(() => {
                        throw new BadRequestException(ERROR.JWT_IS_NOT_VALID);
                    }),
                ),
        );
        return jwtData;
    }
    private async checkRole(routingsKey: string, context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<FastifyRequest>();

        const method = req.routeOptions.method;
        let url = req.routeOptions.url;
        if (url.endsWith(':sid')) {
            url = url.replace(':id', '');
        }
        const routing = url;
        console.log(routing)
        this.logger.debug(`ROUTING : ${routing}`);

        await firstValueFrom(
            this.authClient
                .send('check-role-backend', {
                    routingsKey,
                    url: routing,
                    method : method.toUpperCase()
                })
                .pipe(
                    catchError(({ response }) => {
                        throw new BadRequestException(response);
                    }),
                ),
        );
    }
 
}
