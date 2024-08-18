import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWTData = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().jwtData; // AsSMART_CONTRACT to the request from AuthGuard
    }
    if (context.getType() === 'rpc') {
        return context.switchToRpc().getData().user; // Returned from validate method of JWTStrategy
    }
});
