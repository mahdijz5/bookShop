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


import { ApiBadRequestResponseDto, EmptySuccessResponseDto, } from 'apps/core/src/common/dto';
import { SetToCartDto } from './dto';
import { JWTData } from '@app/common';
import { JwtDataInterface } from 'apps/core/src/common/interface';
import { SkipRole } from 'apps/core/src/common/decorators';
import { SetToCartReqDto } from '@app/common/dto';

@ApiTags('Shopping cart')
@ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
@ApiBearerAuth()
@Controller({ path: 'user/cart', version: '1' })
export class CartController {
    constructor(
        @Inject(PACKAGE_SERVICE)
        private readonly packageClient: ClientProxy,
    ) { }

    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Post("set")
    @SkipRole()
    setToCart(@Body() setToCart: SetToCartDto, @JWTData() data: JwtDataInterface) {
        return this.packageClient
            .send<void, SetToCartReqDto>('cart.setToCart', {
                authId: data.userId,
                ...setToCart
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

    @ApiCreatedResponse({ type: EmptySuccessResponseDto })
    @HttpCode(HttpStatus.OK)
    @Get()
    @SkipRole()
    getUserCart(@JWTData() data: JwtDataInterface) {
        return this.packageClient
            .send<void, JwtDataInterface>('user.cart', {
                userId: data.userId
            })
            .pipe(timeout(REQUEST_TIMEOUT));
    }

}