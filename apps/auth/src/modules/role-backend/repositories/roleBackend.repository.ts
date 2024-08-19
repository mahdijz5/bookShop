import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { RoleBackend } from '../schemas';

@Injectable()
export class RoleBackendRepository extends AbstractRepository<RoleBackend> {
    protected readonly logger: Logger = new Logger(RoleBackendRepository.name);

    constructor(
        @InjectModel(RoleBackend.name) roleBackendModel: Model<RoleBackend>,
        @InjectConnection() connection: Connection,
    ) {
        super(roleBackendModel, connection);
    }

    async findBackend(
        roleId: Types.ObjectId,
        page: number,
        sort: string,
        order,
        limit: number,
    ): Promise<{ result: RoleBackend[]; count: number }> {
        const document = await this.model.aggregate([
            {
                $facet: {
                    result: [
                        { $match: { deletedAt: null, roleId } },
                        {
                            $lookup: {
                                from: 'backends',
                                localField: 'backendId',
                                foreignField: '_id',
                                as: 'backend',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        { $unwind: { path: '$backend', preserveNullAndEmptyArrays: true } },
                        {
                            $project: {
                                deletedAt: 0,
                                updatedAt: 0,
                                backendId: 0,
                                roleId: 0,
                                backend: {
                                    deletedAt: 0,
                                    updatedAt: 0,
                                },
                            },
                        },
                        { $sort: { [sort]: order } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                    count: [{ $match: { deletedAt: null, roleId } }, { $count: 'count' }],
                },
            },
        ]);
        return {
            result: document[0].result,
            count: document[0].count[0] ? Number(document[0].count[0].count) : 0,
        };
    }

    async findRoles(
        backendId: Types.ObjectId,
        page: number,
        sort: string,
        order,
        limit: number,
    ): Promise<{ result: RoleBackend[]; count: number }> {
        const document = await this.model.aggregate([
            {
                $facet: {
                    result: [
                        { $match: { deletedAt: null, backendId } },
                        {
                            $lookup: {
                                from: 'roles',
                                localField: 'roleId',
                                foreignField: '_id',
                                as: 'role',
                                pipeline: [{ $match: { deletedAt: null } }],
                            },
                        },
                        { $unwind: { path: '$role', preserveNullAndEmptyArrays: true } },
                        {
                            $project: {
                                deletedAt: 0,
                                updatedAt: 0,
                                backendId: 0,
                                roleId: 0,
                                role: {
                                    deletedAt: 0,
                                    updatedAt: 0,
                                },
                            },
                        },
                        { $sort: { [sort]: order } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                    count: [{ $match: { deletedAt: null, backendId } }, { $count: 'count' }],
                },
            },
        ]);
        return {
            result: document[0].result,
            count: document[0].count[0] ? Number(document[0].count[0].count) : 0,
        };
    }
}
