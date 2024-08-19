import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { HandleError } from '@app/common/helpers';
import { RoleRepository } from '../role/repositories';
import {  FindRolesRequestDto } from '@app/common/dto/role/role-backend';
import { PaginationResDto } from '@app/common/dto';
import { RoleBackendRepository } from './repositories';
import { BackendRepository } from '../backend/repositories';
import { FindBackendsRequestDto } from '@app/common/dto/role/role-backend/findFronts-req.dto';

@Injectable()
export class RoleBackendService {
    private readonly logger: Logger = new Logger(RoleBackendService.name);

    constructor(
        private readonly roleBackendRepository: RoleBackendRepository,
        private readonly roleRepository: RoleRepository,
        private readonly backendRepository: BackendRepository,
    ) { }

    async create(backendId: string, roleId: string): Promise<object> {
        try {
            await this.backendRepository.isExists({ _id: new Types.ObjectId(backendId) });
            await this.roleRepository.isExists({ _id: new Types.ObjectId(roleId) });

            await this.roleBackendRepository.save({
                backendId: new Types.ObjectId(backendId),
                roleId: new Types.ObjectId(roleId),
            });

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }
 
    async findBackend({
        roleId,
        base: {
            order,
            page,
            row
        },
        field
    }: FindBackendsRequestDto) {
        try {
            await this.roleRepository.isExists({ _id: roleId });

            const backends = await this.roleBackendRepository.findBackend(
                new Types.ObjectId(roleId),
                page,
                field,
                order,
                row,
            );

            return new PaginationResDto(backends.result, { page, row, total: backends.count })

        } catch (error) {
            new HandleError(error);
        }
    }

    async findRoles({
        backendId,
        base: {
            order,
            page,
            row
        },
        field
    }: FindRolesRequestDto) {
        try {
            await this.backendRepository.isExists({ _id: backendId });

            const roles = await this.roleBackendRepository.findRoles(
                new Types.ObjectId(backendId),
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

    async remove(id: string) {
        try {
            await this.roleBackendRepository.isExists({ _id: new Types.ObjectId(id) });
            await this.roleBackendRepository.delete({ _id: new Types.ObjectId(id) });

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }
}
