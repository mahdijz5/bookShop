import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
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
    ApiTags,
} from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { REQUEST_TIMEOUT, AUTH_SERVICE } from '@app/common/constants';
import {
    CreateRoleDto,
     FindOneRoleResultDto,
    UpdateRoleDto,
} from './dto';

import { PaginationReqDto } from '@app/common/dto';
import { ApiBadRequestResponseDto, EmptySuccessResponseDto, FindAllReqDto, ObjectIdDto } from 'apps/core/src/common/dto';
import { ApiFindAllResponse, ApiFindOneResponse } from '../../common/decorators';

@ApiTags('Role')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'role', version: '1' })
export class RoleController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
    ) { }

    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.authClient
            .send('role.create', {
                name: createRoleDto.name,
                isDefault: createRoleDto.isDefault,
                description: createRoleDto.description



            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiFindAllResponse(EmptySuccessResponseDto )
    @HttpCode(HttpStatus.OK)
    @Post('findAll')
    findAll(@Body() data: FindAllReqDto) {
        return this.authClient
            .send('role.findAll', <PaginationReqDto>{
                ...data
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiFindOneResponse(FindOneRoleResultDto)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param() objectIdDto: ObjectIdDto) {
        return this.authClient
            .send('role.findOne', { roleId: objectIdDto.id })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    update(@Param() objectIdDto: ObjectIdDto, @Body() updateRoleDto: UpdateRoleDto) {
        return this.authClient
            .send('role.update', {
                roleId: objectIdDto.id,
                name: updateRoleDto.name,
                isDefault: updateRoleDto.isDefault,
                description: updateRoleDto.description
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param() objectIdDto: ObjectIdDto) {
        return this.authClient
            .send('role.remove', {
                roleId: objectIdDto.id,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

}
