import {
    FilterQuery,
    Model,
    Types,
    Connection,
    ProjectionType,
    QueryOptions,
    ClientSessionOptions,
    ClientSession,
    SaveOptions,
    UpdateQuery,
    MongooseBaseQueryOptionKeys,
} from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import {   NotFoundException } from '@nestjs/common';


export abstract class AbstractRepository<TDocument extends AbstractSchema> {
    constructor(
        protected readonly model: Model<TDocument>,
        private readonly connection: Connection,
    ) { }

    create(document: Omit<TDocument, '_id'>) {
        const createdAt = new Date()
        return new this.model({
            _id: new Types.ObjectId(),
            ...document,
            createdAt
        });
    }

    async save(document: Omit<TDocument, '_id'>, options?: SaveOptions) {
        const createdAt = new Date()

        const createdDocument = new this.model({
            _id: new Types.ObjectId(),
            ...document,
            createdAt
        });
        await createdDocument.save(options);
        return createdDocument;
    }

    async findAndCount(
        filterQuery: FilterQuery<TDocument>,
        projection: ProjectionType<Partial<TDocument>>,
        page: number,
        sort: string,
        order,
        limit: number,
        coordinates?: [number],
    ): Promise<{ result: TDocument[]; count: number }> {
        const query: any = [
            { $match: { deletedAt: null, ...filterQuery } },
            { $project: projection },
            { $sort: { [sort]: order } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ];

        if (coordinates) {
            query.unshift({
                $geoNear: {
                    near: coordinates,
                    spherical: true,
                    distanceField: 'distance',
                    distanceMultiplier: 6378.1, // Earth radius in KM
                },
            });
        }

        const document = await this.model.aggregate([
            {
                $facet: {
                    result: query,
                    count: [{ $match: filterQuery }, { $count: 'count' }],
                },
            },
        ]);

        return {
            result: document[0].result,
            count: document[0].count[0] ? Number(document[0].count[0].count) : 0,
        };
    }

    async find(
        filterQuery: FilterQuery<TDocument>,
        projection: ProjectionType<TDocument>,
    ): Promise<TDocument[]> {
        return await this.model.find(
            {
                deletedAt: null,
                ...filterQuery,
            },
            projection,
            {
                lean: true,
            },
        ) as any
    }

    async findOne(
        filterQuery: FilterQuery<TDocument>,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions<TDocument>,
    ) {
        return await this.model.findOne(
            {
                deletedAt: null,
                ...filterQuery,
            },
            projection,
            options,
        );
    }

    async findOneOrFail(
        filterQuery: FilterQuery<TDocument>,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions<TDocument>,
    ) {
        const document = await this.model.findOne(
            {
                deletedAt: null,
                ...filterQuery,
            },
            projection,
            options,
        );

        if (!document) {
            throw new NotFoundException();
        }

        return document;
    }

    async isExists(filterQuery: FilterQuery<TDocument>) {
        const document = await this.model.exists({
            deletedAt: null,
            ...filterQuery,
        });

        if (!document) {
            throw new NotFoundException();
        }
    }

    async updateOne(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
        options?: QueryOptions<TDocument>,
    ): Promise<TDocument> {
        return await this.model.findOneAndUpdate(
            {
                deletedAt: null,
                ...filterQuery,
            },
            update,
            {
                lean: true,
                new: true,
                ...options,
            },
        );
    }

    async delete(
        filterQuery: FilterQuery<TDocument>,
        options?: Pick<QueryOptions<TDocument>, MongooseBaseQueryOptionKeys>,
    ): Promise<{}> {
        await this.model.deleteOne(filterQuery, options);
        return {}
    }

    async deleteMany(
        filterQuery: FilterQuery<TDocument>,
        options?: Pick<QueryOptions<TDocument>, MongooseBaseQueryOptionKeys>,
    ): Promise<{}> {
        await this.model.deleteMany(filterQuery, options);
        return {}
    }

    async softDelete(
        filterQuery: FilterQuery<TDocument>,
        options?: Pick<QueryOptions<TDocument>, "timestamps" | MongooseBaseQueryOptionKeys>,
    ): Promise<void> {
        const finalFilterQuery = {
            deletedAt: null,
            ...filterQuery,
        };

        await this.model.updateOne(
            {
                ...finalFilterQuery,
            },
            {
                deletedAt: new Date(),
            },
            {
                ...options,
            },
        );
    }

    async startTransaction(options?: ClientSessionOptions): Promise<ClientSession> {
        const session = await this.connection.startSession(options);
        session.startTransaction();

        return session;
    }
}
