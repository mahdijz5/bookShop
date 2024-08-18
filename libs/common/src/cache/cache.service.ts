import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT } from '../constants';

@Injectable()
export class CacheService implements OnModuleDestroy {
    private readonly logger = new Logger(CacheService.name);

    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redisClient: RedisClientType,
    ) {}

    async setKeyNoExpire(key: string, value: string): Promise<void> {
        try {
            await this.redisClient.set(key, value, { EX: 9999999999 });
        } catch (error) {
            this.logger.error(error);
        }
    }

    async setKey(key: string, value: string, ttl?: number): Promise<void> {
        try {
            await this.redisClient.set(key, value, { EX: ttl });
        } catch (error) {
            this.logger.error(error);
        }
    }

    async getKey(key: string): Promise<string> {
        try {
            return await this.redisClient.get(key);
        } catch (error) {
            this.logger.error(error);
        }
    }

    async setObj<TData = Record<string, string>>(
        objectKey: string,
        obj: TData,
        ttl?: number,
    ): Promise<void> {
        try {
            await this.redisClient.hSet(objectKey, obj as any);
            await this.redisClient.expire(objectKey, ttl);
        } catch (error) {
            this.logger.error(error);
        }
    }

    async getObj<TData = Record<string, string>>(objectKey: string): Promise<TData> {
        try {
            const data = await this.redisClient.hGetAll(objectKey);
            return data as TData;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async getObjKey(objectKey: string, key: string): Promise<string> {
        try {
            const data = await this.redisClient.hGet(objectKey, key);
            return data;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async setArray(arrayKey: string, array: string[], ttl?: number): Promise<void> {
        try {
            await this.redisClient.lPush(arrayKey, array);
            await this.redisClient.expire(arrayKey, ttl);
        } catch (error) {
            this.logger.error(error);
        }
    }

    async getArray(arrayKey: string): Promise<string[]> {
        try {
            const data = await this.redisClient.lRange(arrayKey, 0, 9999999999);
            return data;
        } catch (error) {
            this.logger.error(error);
        }
    }

    async delete(objectKeyOrKey: string): Promise<void> {
        try {
            await this.redisClient.del(objectKeyOrKey);
        } catch (error) {
            this.logger.error(error);
        }
    }

    async onModuleDestroy() {
        await this.redisClient.quit();
    }
}
