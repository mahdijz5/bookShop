import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { FindOneResponseDto } from '@app/common/dto/role/role';
import { HandleError } from '@app/common/helpers';
import { PaginationReqDto, PaginationResDto } from '@app/common/dto';
import { BackendRepository } from './repositories';
 
@Injectable()
export class BackendService {
    private readonly logger: Logger = new Logger(BackendService.name);

    constructor(
        private readonly backendRepository: BackendRepository
    ) { }

    async create(name: string, routing: string): Promise<object> {
        try {
            return await this.backendRepository.save({
                name,
                routing
            });

        } catch (error) {
            new HandleError(error);
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
            filter,
        }: PaginationReqDto
    ): Promise<PaginationResDto> {
        try {
            const roles = await this.backendRepository.findAndCount(
                filter,
                {
                    deletedAt: 0,
                    updatedAt: 0,
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

    async findOne(backendId: string): Promise<FindOneResponseDto | object> {
        try {
            const role = await this.backendRepository.findOneOrFail(
                { _id: new Types.ObjectId(backendId) },
                { deletedAt: 0, createdAt: 0, updatedAt: 0 },
            );


            return { role };
        } catch (error) {
            new HandleError(error);
        }
    }

    async update(backendId: string, name: string, routing: string) {
        try {
            await this.backendRepository.isExists({ _id: new Types.ObjectId(backendId) });

            await this.backendRepository.updateOne(
                { _id: new Types.ObjectId(backendId) },
                { name, routing },
                { projection: { _id: 1 } },
            );

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

    async remove(backendId) {
        try {
            await this.backendRepository.isExists({ _id: new Types.ObjectId(backendId) });
            await this.backendRepository.delete({ _id: new Types.ObjectId(backendId) });

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }




}
