import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { CreateIpgDto, UpdateIpgDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { IPG_SERVICE, MESSAGE_PATTERN, REQUEST_TIMEOUT } from '@app/common';
import { CreateIpgReqDto, CreatePaymentReqDto, PaginationReqDto, RemoveReqDto, UpdateIpgReqDto } from '@app/common/dto';
import { timeout } from 'rxjs';
import { FindAllReqDto } from '../common/dto';
import { CreatePaymentRDto } from './dto/create-payment.dto';

@ApiTags('Ipg')
@Controller({ path: 'ipg', version: '1' }) 
export class IpgController {
    constructor(@Inject(IPG_SERVICE) private readonly ipgClient: ClientProxy) { }
 

    @HttpCode(HttpStatus.CREATED) 
    @Post()
    create(@Body() createIpg: CreateIpgDto) {

        return this.ipgClient
            .send<void, CreateIpgReqDto>(MESSAGE_PATTERN.IPG.CREATE, { 
                ...createIpg
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }  
 
    @HttpCode(HttpStatus.OK)
    @Patch('/:id')
    update(@Body() createIpg: UpdateIpgDto, @Param("id") id: string) {
        return this.ipgClient 
            .send<void, UpdateIpgReqDto>(MESSAGE_PATTERN.IPG.UPDATE, {
                ...createIpg,
                id
            }) 
            .pipe(timeout(REQUEST_TIMEOUT));  
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    remove(@Param("id") id: string) {
        return this.ipgClient
            .send<void, RemoveReqDto>(MESSAGE_PATTERN.IPG.REMOVE, {
                id
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @HttpCode(HttpStatus.OK)
    @Post("findAll")
    findAll(@Body() findAll: FindAllReqDto) {
        return this.ipgClient
            .send<void, PaginationReqDto>(MESSAGE_PATTERN.IPG.FINDALL, {
                ...findAll
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @HttpCode(HttpStatus.OK)
    @Post("json/insert/:identifier")
    insertFromJson(@Param("identifier") identifier: string) {
        console.log(2222)
        return this.ipgClient
            .send<void, any>(MESSAGE_PATTERN.IPG.INSERT_FROMJSON, {
                identifier
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @HttpCode(HttpStatus.OK)
    @Post("json/findAll")
    findAllFromJson() {
        console.log(213)
        return this.ipgClient
            .send<void, any>(MESSAGE_PATTERN.IPG.FINDALL_JSON, {

            })
            .pipe(timeout(REQUEST_TIMEOUT)); 
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("payment")
    createPayment(@Body() createIpg: CreatePaymentRDto) {

        return this.ipgClient
            .send<void, CreatePaymentReqDto>(MESSAGE_PATTERN.IPG.PAYMENT, {
                ...createIpg
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @HttpCode(HttpStatus.OK)
    @Post("callback")
    callback(@Body() body: any, @Query() query: any) {

        return this.ipgClient
            .send<void, any>(MESSAGE_PATTERN.IPG.PAYMENT_CALLBACK, {
                ...body,
                ...query
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }
    @HttpCode(HttpStatus.OK)
    @Get("callback")
    callbackGet(@Query() query: any) {

        return this.ipgClient
            .send<void, any>(MESSAGE_PATTERN.IPG.PAYMENT_CALLBACK, {
                ...query
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

}

