import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
    protected readonly logger: Logger = new Logger(OrderRepository.name);

    constructor(
        @InjectModel(Order.name) bookModel: Model<Order>,
        @InjectConnection() connection: Connection,
    ) {
        super(bookModel, connection);
    }

    async findAllWithTransaction(
        userId: Types.ObjectId,
        filter: FilterQuery<Order>,
        page: number,
        sort: string,
        order,
        limit: number,

    ): Promise<{ result: Order[]; count: number }> {
        const document = await this.model.aggregate([
            {
                $facet: {
                    result: [
                        { $match: { deletedAt: null, ...filter, userId } },
                        {
                            $lookup: {
                                from: 'transactions',
                                localField: 'transactionId',
                                foreignField: '_id',
                                as: 'transactions',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        {
                            $addFields: {
                                transaction: { $first: "$transactions" },
                            },
                        },


                        {
                            $project: {
                                deletedAt: 0,
                                updatedAt: 0,
                                backendId: 0,
                                roleId: 0,
                                transactions : 0,
                                transactionId : 0,
                                transaction: {
                                    deletedAt: 0,
                                    updatedAt: 0,
                                },
                            },
                        },
                        { $sort: { [sort]: order } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },

                    ],
                    count: [{ $match: { deletedAt: null, ...filter, userId } }, { $count: 'count' }],


                },
            },
        ]);
        return {
            result :  document[0].result,
            count :  document[0].count[0].count
        }
    }
}
