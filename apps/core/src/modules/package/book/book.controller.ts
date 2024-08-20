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


import { CreateBookReqDto, PaginationReqDto, PaginationResDto, RemoveReqDto, UpdateBookReqDto } from '@app/common/dto';
import { ApiBadRequestResponseDto, EmptySuccessResponseDto, FindAllReqDto, ObjectIdDto } from 'apps/core/src/common/dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto';
import { ApiFindAllResponse, Public, SkipRole } from 'apps/core/src/common/decorators';

@ApiTags('Book')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'book', version: '1' })
export class BookController {
    constructor(
        @Inject(PACKAGE_SERVICE)
        private readonly packageClient: ClientProxy,
    ) { }

    @ApiOperation({
        summary : "Create book"
    })
    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createBook: CreateBookDto) {
        return this.packageClient
            .send<void, CreateBookReqDto>('book.create', {
                ...createBook
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOperation({
        summary : "Update book"
    })
    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    update(@Body() updateBook: UpdateBookDto, @Param("id") { id }: ObjectIdDto) {
        return this.packageClient
            .send<void, UpdateBookReqDto>('book.update', {
                ...updateBook,
                id
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }


    @ApiOperation({
        summary : "Remove book"
    })
    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    remove(@Param("id") { id }: ObjectIdDto) {
        return this.packageClient
            .send<void, RemoveReqDto>('book.remove', {
                id
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiOperation({
        summary : "FindAll book"
    })
    @ApiFindAllResponse(PaginationResDto)
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post("findAll")
    findAll(@Body() findAll: FindAllReqDto) {
        return this.packageClient
            .send<void, PaginationReqDto>('book.findAll', {
                ...findAll
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }
}