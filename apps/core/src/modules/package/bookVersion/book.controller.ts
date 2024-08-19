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
import { REQUEST_TIMEOUT, AUTH_SERVICE, PACKAGE_SERVICE } from '@app/common/constants';


import { CreateBookReqDto, CreateBookVersionReqDto, FindAllOfBookReqDto, PaginationReqDto, PaginationResDto, RemoveReqDto, UpdateBookReqDto } from '@app/common/dto';
import { ApiBadRequestResponseDto, EmptySuccessResponseDto, FindAllReqDto, ObjectIdDto } from 'apps/core/src/common/dto';
import { CreateBookVersionDto } from './dto/create-bookVersion.dto';
import { ApiFindAllResponse } from 'apps/core/src/common/decorators';

@ApiTags('Book version')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'book/version', version: '1' })
export class BookVersionController {
    constructor(
        @Inject(PACKAGE_SERVICE)
        private readonly packageClient: ClientProxy,
    ) { }

    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createBook: CreateBookVersionDto) {
        return this.packageClient
            .send<void, CreateBookVersionReqDto>('bookVersion.create', {
                ...createBook
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }


    @ApiOperation({ summary: "FindAll versions of book" })
    @ApiFindAllResponse(PaginationResDto)
    @HttpCode(HttpStatus.OK)
    @Post("findAll/:id")
    findAll(@Body() findAll: FindAllReqDto, @Param() { id }: ObjectIdDto) {
        return this.packageClient
            .send<void, FindAllOfBookReqDto>('bookVersion.findAll', {
                ...findAll,
                bookId: id
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }
}