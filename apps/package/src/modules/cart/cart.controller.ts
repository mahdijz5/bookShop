import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartReqDto, SetToCartReqDto } from '@app/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService : CartService
    ) {}

    @MessagePattern("cart.create")
    async create(@Payload() createCart: CreateCartReqDto): Promise<{}> {
        return await this.cartService.create(createCart)
    }
    
    @MessagePattern("cart.setToCart")
    async setToCart(@Payload() data: SetToCartReqDto): Promise<{}> {
        return await this.cartService.setToCart(data)
    }
}
