import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';

import { AbstractRepository } from '@app/common';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BookRepository extends AbstractRepository<Book> {
    protected readonly logger: Logger = new Logger(BookRepository.name);

    constructor(
        @InjectModel(Book.name) bookModel: Model<Book>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }

    async findAllWithLatestVersion(
        filter: FilterQuery<Book>,
        page: number,
        sort: string,
        order,
        limit: number,
    ): Promise<{ result: Book[]; count: number }> {
        const document = await this.model.aggregate([
            {
                $facet: {
                    result: [
                        { $match: { deletedAt: null, ...filter } },
                        {
                            $lookup: {
                                from: 'bookversions',
                                localField: '_id',
                                foreignField: 'bookId',
                                as: 'version',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        {
                            $unwind: '$version',
                        }, {
                            $project: {
                                deletedAt: 0,
                                updatedAt: 0,
                                backendId: 0,
                                roleId: 0,
                                version: {
                                    deletedAt: 0,
                                    updatedAt: 0,
                                    
                                },
                            },
                        },
                        { $sort: { [sort]: order } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                    count: [{ $match: { deletedAt: null, ...filter  } }, { $count: 'count' }],
                },
            },
        ]);
        return {
            result: document[0].result,
            count: document[0].count[0] ? Number(document[0].count[0].count) : 0,
        };
    }
}
