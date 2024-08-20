import * as crypto from 'crypto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { RoleRepository, UserRoleRepository } from './repositories';
import { FindAllResponseDto, FindOneResponseDto } from '@app/common/dto/role/role';
import { HandleError } from '@app/common/helpers';
import { JWT_EXPIRE } from '@app/common/constants';
import { CacheService } from '@app/common/cache';
import { JwtService } from '@nestjs/jwt';
import { PaginationReqDto, PaginationResDto } from '@app/common/dto';
import { AuthRepository } from '../auth/repositories';
import { ERROR, RouteMethod } from '@app/common';
import { genRandomString } from '../../utils';
import { BackendRepository } from '../backend/repositories';
import { RoleBackendRepository } from '../role-backend/repositories';
 
@Injectable()
export class RoleService {
    private readonly logger: Logger = new Logger(RoleService.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly backendRepository: BackendRepository,
        private readonly roleBackendRepository: RoleBackendRepository,
        private readonly roleRepository: RoleRepository,
        private readonly userRoleRepository: UserRoleRepository,
        private readonly cacheService: CacheService,

    ) {
       
    }

    async checkRoleBackend(url: string, routingsKey: string,method : RouteMethod) {
        try {
            const routings = await this.cacheService.getArray(routingsKey);
            if (!routings || !routings.includes(url)) {
                throw new BadRequestException(ERROR.ROUTE_ACCESS_DENIED);
            }
            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

    async getUserRoles(userId) {
        try {
            const userRoles = await this.userRoleRepository.find(
                { userId: new Types.ObjectId(userId) },
                { _id: 0, userId: 0, createdAt: 0, updatedAt: 0 },
            );
            const userRoleIds = userRoles.map((userRole) => userRole.roleId);

            return await this.roleRepository.find(
                { _id: { $in: userRoleIds } },
                {
                    createdAt: 0,
                    updatedAt: 0,
                    deletedAt: 0,
                },
            );
        } catch (error) {
            new HandleError(error);
        }
    }

    async setDefaultRole(userId) {
        try {
            const defaultRole = await this.roleRepository.findOne({ isDefault: true });

            if (!defaultRole) {
                this.logger.log('User verified without default role, please add default role');
                return;
            }

            await this.userRoleRepository.save({
                userId: new Types.ObjectId(userId),
                roleId: defaultRole._id,
            });
        } catch (error) {
            new HandleError(error);
        }
    }

    async setRole(userId, roleId) {
        try {
            const isUserRoleExist = await this.userRoleRepository.findOne({
                userId,
                roleId,
            });
            if (isUserRoleExist) {
                throw new BadRequestException(ERROR.ROLE_ALREADY_ALLOCATED);
            }

            await this.roleRepository.isExists({ _id: roleId });

            await this.userRoleRepository.save({ userId, roleId });

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

    async unsetRole(userId, roleId) {
        try {
            const isUserRoleExist = await this.userRoleRepository.findOne({
                userId,
                roleId,
            });
            if (!isUserRoleExist) {
                throw new BadRequestException(ERROR.DO_NOT_HAVE_THIS_ROLE);
            }

            await this.roleRepository.isExists({ _id: roleId });

            await this.userRoleRepository.delete({ userId, roleId });

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

    async create(name: string, isDefault: boolean, description: string): Promise<object> {
        try {
            await this.roleRepository.save({
                name,
                isDefault,
                description
            });

            return {};
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
            filter
        }: PaginationReqDto
    ): Promise<PaginationResDto> {
        try {
            const roles = await this.roleRepository.findAndCount(
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

    async findOne(roleId: string): Promise<FindOneResponseDto | object> {
        try {
            const role = await this.roleRepository.findOneOrFail(
                { _id: new Types.ObjectId(roleId) },
                { deletedAt: 0, createdAt: 0, updatedAt: 0 },
            );

            return role;
        } catch (error) {
            new HandleError(error);
        }
    }

    async update(roleId: string, name: string, isDefault: boolean, description: string) {
        try {
            await this.roleRepository.isExists({ _id: new Types.ObjectId(roleId) });

            await this.roleRepository.updateOne(
                { _id: new Types.ObjectId(roleId) },
                { name, isDefault, description },
                { projection: { _id: 1 } },
            );

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

    async remove(roleId) {
        try {
            await this.roleRepository.isExists({ _id: new Types.ObjectId(roleId) });

            const isRoleInUse = await this.userRoleRepository.findOne({
                roleId: new Types.ObjectId(roleId),
            });
            if (isRoleInUse) {
                throw new BadRequestException(ERROR.ROLE_IN_USE);
            }

            await this.roleRepository.delete({
                _id: new Types.ObjectId(roleId),
            });

            return {};
        } catch (error) {
            new HandleError(error);
        }
    }

    async addRole(userId, roleId) {
        try {
            const userRoles = await this.getUserRoles(userId);
            if (userRoles.length < 1) {
                throw new BadRequestException(ERROR.DO_NOT_HAVE_THIS_ROLE);
            }

            const userRoleIds = userRoles.map((userRole) => userRole._id.toString());
            if (!userRoleIds.includes(roleId)) {
                throw new BadRequestException(ERROR.ROLE_ACCESS_DENIED);
            }


            const roleBackends = await this.roleBackendRepository.find(
                { roleId },
                { _id: 0, backendId : 1 },
            );
            const backendIds = roleBackends.map((rolebackend) => rolebackend.backendId);
            const backends = await this.backendRepository.find(
                {
                    _id: {
                        $in: backendIds,
                    },
                },
                {
                    _id: 0,
                    deletedAt: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    name: 0,
                    status: 0,
                },
            );
            const routings = backends.map((backend) => backend.routing);
            const routingsKey = crypto.randomUUID();
            await this.cacheService.setArray(routingsKey, routings, JWT_EXPIRE);

            const key = genRandomString();
            await this.cacheService.setObj(
                key,
                {
                    userId,
                    routingsKey,
                },
                JWT_EXPIRE,
            );
            const token = this.jwtService.sign({ key });
            let extraNeededData = {}



            return {
                ...extraNeededData,
                token,
            };
        } catch (error) {
            new HandleError(error);
        }
    }
 


}
