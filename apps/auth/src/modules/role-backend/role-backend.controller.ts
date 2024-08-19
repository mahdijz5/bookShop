import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
    CreateRequestDto,
    RemoveRequestDto,
    FindRolesRequestDto,
} from '@app/common/dto/role/role-backend';
import { RoleBackendService } from './role-backend.service';
import { FindBackendsRequestDto } from '@app/common/dto/role/role-backend/findFronts-req.dto';

@Controller()
export class RoleBackendController {
    constructor(private readonly roleBackendService: RoleBackendService) { }

    @MessagePattern('role-backend.create')
    async create(@Payload() createRequestDto: CreateRequestDto) {
        return await this.roleBackendService.create(
            createRequestDto.backendId,
            createRequestDto.roleId,
        );
    }

    @MessagePattern('role-backend.findBackends')
    async findBackends(@Payload() findBackendsRequestDto: FindBackendsRequestDto) {
        return await this.roleBackendService.findBackend(findBackendsRequestDto);
    }

    @MessagePattern('role-backend.findRoles')
    async findRoles(@Payload() findRolesRequestDto: FindRolesRequestDto) {
        return await this.roleBackendService.findRoles(findRolesRequestDto);
    }

    @MessagePattern('role-backend.remove')
    async remove(@Payload() removeRequestDto: RemoveRequestDto) {
        return await this.roleBackendService.remove(removeRequestDto.id);
    }
}
