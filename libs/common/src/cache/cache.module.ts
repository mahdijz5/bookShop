import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createClient } from 'redis';
import { CacheService } from './cache.service';
import { REDIS_CLIENT } from '../constants';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {
    static register(): DynamicModule {
        const cacheProvider: Provider = {
            provide: REDIS_CLIENT,
            useFactory: async (configService: ConfigService) => {
                const REDIS_HOST = configService.getOrThrow<string>('REDIS_HOST');
                const REDIS_PORT = configService.getOrThrow<string>('REDIS_PORT');
                const client = createClient({
                    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
                });
                await client.connect();
                return client;
            },
            inject: [ConfigService],
        };
        return {
            module: CacheModule,
            providers: [cacheProvider],
            exports: [cacheProvider],
        };
    }
}
