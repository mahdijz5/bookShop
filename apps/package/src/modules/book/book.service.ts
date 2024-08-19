import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRepository } from './repositories';
import { CreateBookReqDto, UpdateBookReqDto } from '@app/common/dto/book';
import { HandleError } from '@app/common/helpers';
import { Types } from 'mongoose';
import * as moment from 'moment';
import { ERROR } from '@app/common';
import { PaginationReqDto, PaginationResDto, RemoveReqDto } from '@app/common/dto';
import { BookVersionService } from '../bookVersion/bookVersion.service';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly bookVersionService: BookVersionService,
    ) {
    }

    async create(createBook: CreateBookReqDto) {
        try {
            const book = await this.bookRepository.save({
                ...createBook
            })

            await this.bookVersionService.create({
                bookId: book._id.toString(),
                price: createBook.price
            })
            return {}
        } catch (error) {
            new HandleError(error)
        }
    }

    async update(updateBook: UpdateBookReqDto) {
        try {
            const book = await this.bookRepository.findOne({
                _id: new Types.ObjectId(updateBook.id),
            })
            if (!book) throw new BadRequestException(ERROR.BOOK_NOTFOUND)


            await this.bookRepository.updateOne({
                _id: new Types.ObjectId(updateBook.id),
            }, {
                ...updateBook,
            })

            return {}
        } catch (error) {
            new HandleError(error)
        }
    }

    async remove(removeBook: RemoveReqDto) {
        try {
            const book = await this.bookRepository.findOne({
                _id: new Types.ObjectId(removeBook.id),
            })
            if (!book) throw new BadRequestException(ERROR.BOOK_NOTFOUND)


            await this.bookRepository.delete({
                _id: new Types.ObjectId(removeBook.id),
            })

            return {}
        } catch (error) {
            new HandleError(error)
        }
    }

    async findAll(
        {
            base: {
                order,
                page,
                row
            },
            field,
            filter
        }: PaginationReqDto
    ) {
        try {
            const books = await this.bookRepository.findAllWithLatestVersion(
                filter,
                page,
                field,
                order,
                row,

            );

            return books
        } catch (error) {
            new HandleError(error);
        }
    }


}
