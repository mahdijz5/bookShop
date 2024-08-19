import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { CacheModule } from '@app/common/cache';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BookVersionService } from './bookVersion.service';
import { Book, BookSchema } from '../book/schemas';
import { BookRepository } from '../book/repositories';
import { BookVersionRepository } from './repositories';
import { BookVersion, BookVersionSchema } from './schemas';
import { BookVersionController } from './bookVersion.controller';

@Module({
    imports: [
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/package/.env",
            validationSchema: Joi.object({
                MONGO_URI: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.string().required(),
            })
        }),
        CacheModule.register(),
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: Book.name,
                schema: BookSchema,
            },
            {
                name: BookVersion.name,
                schema: BookVersionSchema,
            }
        ]),
    ],
    providers: [BookVersionService, BookRepository,BookVersionRepository],
    controllers: [BookVersionController],
    exports : [BookVersionService]
})
export class BookVersionModule { }
