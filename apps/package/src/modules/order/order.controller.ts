import { CallbackResDto, PaginationUserIdReqDto, PurchaseBookReqDto } from '@app/common/dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }
   
    @MessagePattern("user.order.findAll")
    async findAllUserOrder(@Payload() data: PaginationUserIdReqDto) {
        return this.orderService.findAllOfUser(data)
    }

    @MessagePattern("purchase")
    async purchase(@Payload() data: PurchaseBookReqDto) {
        return this.orderService.purchase(data)
    }

    @MessagePattern("callback")
    async callback(@Payload() data: CallbackResDto) {
        return this.orderService.callBack(data)
    }
}
