import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { REQUEST_TIMEOUT, AUTH_SERVICE } from '@app/common/constants';

import { ApiBadRequestResponseDto, EmptySuccessResponseDto, FindAllReqDto, ObjectIdDto } from 'apps/core/src/common/dto';
import { CreateRoleBackendIdDto } from './dto';
import { CreateRequestDto, FindAllResponseDto, FindRolesRequestDto } from '@app/common/dto/role/role-backend';
import { ApiFindAllResponse } from '../../common/decorators';
import { RemoveReqDto } from '@app/common/dto';
import { FindBackendsRequestDto } from '@app/common/dto/role/role-backend/findFronts-req.dto';

@ApiTags('RoleBackend')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'role-backend', version: '1' })
export class RoleBackendController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
    ) { }

    @ApiOperation({
        summary: "Attach  backendRoute to role"
    })
    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createRoleDto: CreateRoleBackendIdDto) {
        return this.authClient
            .send<void, CreateRequestDto>('role-backend.create', {
                backendId: createRoleDto.backendId,
                roleId: createRoleDto.roleId,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOperation({
        summary: "Get backends of role"
    })
    @HttpCode(HttpStatus.OK)
    @Post('backends/:roleId')
    findBackends(@Body() data: FindAllReqDto, @Param("roleId") roleId: string) {
        return this.authClient
            .send<FindAllResponseDto, FindBackendsRequestDto>('role-backend.findBackends', {
                ...data,
                roleId
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOperation({
        summary: "Get roles of backend"
    })
    @ApiFindAllResponse(EmptySuccessResponseDto)
    @HttpCode(HttpStatus.OK)
    @Post('roles/:backendId')
    findRoles(@Body() data: FindAllReqDto, @Param("backendId") backendId: string) {
        return this.authClient
            .send<FindAllResponseDto, FindRolesRequestDto>('role-backend.findRoles', {
                ...data,
                backendId
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }


    @ApiOperation({
        summary: "Detach Role backend"
    })
    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param() objectIdDto: ObjectIdDto) {
        return this.authClient
            .send<void, RemoveReqDto>('role-backend.remove', {
                id: objectIdDto.id,
            })
            .pipe(timeout(REQUEST_TIMEOUT)) 
    }
}
