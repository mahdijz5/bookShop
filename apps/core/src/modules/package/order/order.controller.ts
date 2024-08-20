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


import { ApiBadRequestResponseDto, EmptySuccessResponseDto, FindAllReqDto, } from 'apps/core/src/common/dto';
import { JWTData } from '@app/common';
import { JwtDataInterface } from 'apps/core/src/common/interface';
import { SkipRole } from 'apps/core/src/common/decorators';
import { PaginationReqDto, PaginationUserIdReqDto, PurchaseBookReqDto, SetToCartReqDto } from '@app/common/dto';
import { PurchaseBookDto, PurchaseBookResDto } from './dto';

@ApiTags('Order')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'order', version: '1' })
export class OrderController {
    constructor(
        @Inject(PACKAGE_SERVICE)
        private readonly packageClient: ClientProxy,
    ) { }

    @ApiOkResponse({ type: PurchaseBookResDto })
    @HttpCode(HttpStatus.OK)
    @Post("payment")
    @SkipRole()
    setToCart(@Body() purchase: PurchaseBookDto, @JWTData() data: JwtDataInterface) {
        return this.packageClient
            .send<void, PurchaseBookReqDto>('purchase', {
                userId :data.userId,
                ...purchase
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }


    @ApiOperation({summary : "FindAll orders of user"})
    @ApiOkResponse({ type: PurchaseBookResDto })
    @HttpCode(HttpStatus.OK)
    @Post("user/findAll")
    @SkipRole()
    findAllOfUser(@Body() pagination: FindAllReqDto, @JWTData() data: JwtDataInterface) {
        return this.packageClient
            .send<void, PaginationUserIdReqDto>('user.order.findAll', {
                ...pagination,
                userId :data.userId,
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

}