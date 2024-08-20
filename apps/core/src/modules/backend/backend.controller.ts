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
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { REQUEST_TIMEOUT, AUTH_SERVICE } from '@app/common/constants';
 
import { PaginationReqDto    } from '@app/common/dto';
import { ApiBadRequestResponseDto, EmptySuccessResponseDto, FindAllReqDto, ObjectIdDto } from 'apps/core/src/common/dto';
import { BackendDto, CreateBackendDto, UpdateBackendDto } from './dto';
import { ApiFindAllResponse, ApiFindOneResponse } from '../../common/decorators';
import { PaginationResDto } from '../../common/dto/pagination-res.dto';
import { FindOneRequestDto, FindOneResponseDto, RemoveRequestDto, UpdateRequestDto } from '@app/common/dto/role';

@ApiTags('backend')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'backend', version: '1' })
export class BackendController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authClient: ClientProxy,
    ) { }

    @ApiOperation({
        summary : "Create backend Api routes"
    })
    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createRoleDto: CreateBackendDto) {
        return this.authClient
            .send<void, CreateBackendDto>('backend.create', {
                name: createRoleDto.name,
                routing: createRoleDto.routing,
                method: createRoleDto.method
                
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiFindAllResponse(PaginationResDto<BackendDto>)
    @HttpCode(HttpStatus.OK)
    @Post('findAll')
    findAll(@Body() data: FindAllReqDto) {
        return this.authClient
            .send<void, PaginationReqDto>('backend.findAll', {
                ...data
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiFindOneResponse(BackendDto)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param() objectIdDto: ObjectIdDto) {
        return this.authClient
            .send<FindOneResponseDto, FindOneRequestDto>('backend.findOne', {
                backendId: objectIdDto.id,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    update(@Param() objectIdDto: ObjectIdDto, @Body() updateRoleDto: UpdateBackendDto) {
        return this.authClient
            .send<void, UpdateRequestDto>('backend.update', {
                backendId: objectIdDto.id,
                name: updateRoleDto.name,
                routing: updateRoleDto.routing 
                
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOkResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param() objectIdDto: ObjectIdDto) {
        return this.authClient
            .send<void, RemoveRequestDto>('backend.remove', {
                backendId: objectIdDto.id,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }
}
