import { BadRequestException, Injectable } from '@nestjs/common';
import { FindAllOfBookReqDto, UpdateBookReqDto } from '@app/common/dto/book';
import { HandleError } from '@app/common/helpers';
import { Types } from 'mongoose';
import { ERROR } from '@app/common';
import { CreateBookVersionReqDto, PaginationReqDto, PaginationResDto, RemoveReqDto } from '@app/common/dto';
import { BookVersionRepository } from './repositories';
import { BookRepository } from '../book/repositories';

@Injectable()
export class BookVersionService {
    constructor(
        private readonly bookVersionRepository: BookVersionRepository,
        private readonly bookRepository: BookRepository,
    ) {
    }

    async create(createBookVersion: CreateBookVersionReqDto) {
        try {
            const book = await this.bookRepository.findOne({
                _id: new Types.ObjectId(createBookVersion.bookId)
            })
            if (!book) throw new BadRequestException(ERROR.BOOK_NOTFOUND)

            await this.bookVersionRepository.save({
                bookId: book._id,
                price: createBookVersion.price
            })

            return {}
        } catch (error) {
            new HandleError(error)
        }
    }


    async findAllVersions(
        {
            base: {
                order,
                page,
                row
            },
            field,
            filter,
            bookId
        }: FindAllOfBookReqDto
    ): Promise<PaginationResDto> {
        try {
            const roles = await this.bookVersionRepository.findAndCount(
                {
                    ...filter,
                    bookId: new Types.ObjectId(bookId)
                },
                {
                    updatedAt: 0,
                    deletedAt: 0,
                },
                page,
                field,
                order,
                row,
            );

            return new PaginationResDto(roles.result, { page, row, total: roles.count })
        } catch (error) {
            new HandleError(error);
        }
    }


}
