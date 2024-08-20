import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { CartBook } from '../schemas/cartBook.schema';
import { version } from 'os';

@Injectable()
export class CartBookRepository extends AbstractRepository<CartBook> {
    protected readonly logger: Logger = new Logger(CartBookRepository.name);

    constructor(
        @InjectModel(CartBook.name) bookModel: Model<CartBook>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }

    async findBooksVersions(
        filter: FilterQuery<CartBook>,
        cartId: Types.ObjectId,

    ): Promise<CartBook[]> {
        const document = await this.model.aggregate([
            {
                $facet: {
                    result: [
                        { $match: { deletedAt: null, ...filter, cartId } },
                        {
                            $lookup: {
                                from: 'bookversions',
                                localField: 'bookId',
                                foreignField: 'bookId',
                                as: 'versions',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        {
                            $addFields: {
                                version: { $first: "$versions" },
                            },
                        },
                        {
                            $project: {
                                deletedAt: 0,
                                updatedAt: 0,
                                backendId: 0,
                                roleId: 0,
                                versions : 0,
                                version: {
                                    deletedAt: 0,
                                    updatedAt: 0,
                                },
                            },
                        },

                    ],
                },
            },
        ]);
        return document[0].result
    }

    async findByBooksVersions(
        filter: FilterQuery<CartBook>,
        cartId: Types.ObjectId,

    ): Promise<CartBook[]> {
        const document = await this.model.aggregate([
            {
                $facet: {
                    result: [
                        { $match: { deletedAt: null, ...filter, cartId } },
                        {
                            $lookup: {
                                from: 'books',
                                localField: 'bookId',
                                foreignField: '_id',
                                as: 'books',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        {
                            $lookup: {
                                from: 'bookversions',
                                localField: 'bookId',
                                foreignField: 'bookId',
                                as: 'versions',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        {
                            $addFields: {
                                version: { $first: "$versions" },
                                book : {$first : "$books"}
                            },
                        },
                        {
                            $project: {
                                deletedAt: 0,
                                updatedAt: 0,
                                backendId: 0,
                                roleId: 0,
                                versions : 0,
                                books : 0,
                                version: {
                                    deletedAt: 0,
                                    updatedAt: 0,
                                },
                            },
                        },

                    ],
                },
            },
        ]);
        return document[0].result
    }
}
