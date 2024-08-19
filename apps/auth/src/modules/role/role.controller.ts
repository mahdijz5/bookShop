import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import {
    CreateRequestDto,
    FindOneRequestDto,
    RemoveRequestDto,
    SetRoleRequestDto,
    UnsetRoleRequestDto,
    UpdateRequestDto,
    AddRoleRequestDto,
} from '@app/common/dto/role/role';
import { PaginationReqDto } from '@app/common/dto';

@Controller()
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @MessagePattern('check-role-backend')
    async checkRoleBackend(@Payload() checkRoleBackendDto) {
        return await this.roleService.checkRoleBackend(
            checkRoleBackendDto.url,
            checkRoleBackendDto.routingsKey,
        );
    }

    @MessagePattern('setRole')
    async setRole(@Payload() setRoleRequestDto: SetRoleRequestDto) {
        return await this.roleService.setRole(setRoleRequestDto.userId, setRoleRequestDto.roleId);
    }

    @MessagePattern('unsetRole')
    async unsetRole(@Payload() unsetRoleRequestDto: UnsetRoleRequestDto) {
        return await this.roleService.unsetRole(
            unsetRoleRequestDto.userId,
            unsetRoleRequestDto.roleId,
        );
    }

    @MessagePattern('role.create')
    async create(@Payload() createRequestDto: CreateRequestDto) {
        return await this.roleService.create(
            createRequestDto.name,
            createRequestDto.isDefault,
            createRequestDto.description
        );
    }

    @MessagePattern('role.findAll')
    async findAll(@Payload() data: PaginationReqDto) {
        return await this.roleService.findAll(data);
    }

    @MessagePattern('role.findOne')
    async findOne(@Payload() findOneRequestDto: FindOneRequestDto) {
        return await this.roleService.findOne(findOneRequestDto.roleId);
    }

    @MessagePattern('role.update')
    async update(@Payload() updateRequestDto: UpdateRequestDto) {
        return await this.roleService.update(
            updateRequestDto.roleId,
            updateRequestDto.name,
            updateRequestDto.isDefault,
            updateRequestDto.description,
         );
    }

    @MessagePattern('role.remove')
    async remove(@Payload() removeRequestDto: RemoveRequestDto) {
        return await this.roleService.remove(removeRequestDto.roleId);
    }

    @MessagePattern('add-role')
    async addRole(@Payload() addRoleRequestDto: AddRoleRequestDto) {
        return await this.roleService.addRole(addRoleRequestDto.userId, addRoleRequestDto.roleId, addRoleRequestDto.idPostgres);
    }
 
 
}
