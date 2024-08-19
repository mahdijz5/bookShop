import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { Book, BookSchema } from './schemas';
import { BookRepository } from './repositories';
import { BookVersionModule } from '../bookVersion/bookVersion.module';

@Module({
  imports: [

    BookVersionModule,
    DatabaseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      }
    ]),
  ],
  providers: [BookService, BookRepository],
  controllers: [BookController]
})
export class BookModule { }
