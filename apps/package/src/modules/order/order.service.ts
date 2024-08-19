import { Inject, Injectable } from '@nestjs/common';
import { OrderBookRepository, OrderRepository } from './repositories';
import { HandleError } from '@app/common/helpers';
import { CartService } from '../cart/cart.service';
import { CallbackResDto, CreatePaymentReqDto, PaginationReqDto, PurchaseBookReqDto } from '@app/common/dto';
import { CartBookRepository, CartRepository } from '../cart/repositories';
import { BookVersionRepository } from '../bookVersion/repositories';
import { Types } from 'mongoose';
import { IPG_SERVICE, MESSAGE_PATTERN, OrderStatusEnum } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly orderBookRepository: OrderBookRepository,
        private readonly cartBookRepository: CartBookRepository,
        private readonly cartService: CartService,
        @Inject(IPG_SERVICE) private readonly ipgClient: ClientProxy,
        private readonly configService: ConfigService

    ) {
        // this.purchase({ userId: "66c375d6217cff490a75d362" })
    }
    async purchase(data: PurchaseBookReqDto) {
        try {
            const cart = await this.cartService.getCartOfUser(data.userId)
            const cartBooks: any = await this.cartBookRepository.findBooksVersions({
                cartId: cart._id
            }, cart._id)

            let totalPrice = 0

            const order = await this.orderRepository.create({
                totalPrice,
                userId: new Types.ObjectId(data.userId),
            })

            cartBooks.forEach(async (item) => {
                totalPrice += item.version.price
                await this.orderBookRepository.save({
                    bookVersionId: item.version._id,
                    orderId: order._id,
                    quantity: item.quantity
                })
            })

            const { link, transactionId } = await lastValueFrom(this.ipgClient.send<{ link: string, transactionId: string }, CreatePaymentReqDto>(MESSAGE_PATTERN.IPG.PAYMENT, {
                amount: totalPrice,
                callbackUrl: this.configService.get("CALLBACK_URL"),
                gatewayId: data.gatewayId
            }))

            order.transactionId = new Types.ObjectId(transactionId)
            order.totalPrice = totalPrice
            order.save()

            return link

        } catch (error) {
            new HandleError(error)
        }
    }


    async callBack({
        isError,
        transactionId
    }: CallbackResDto) {
        try {
            console.log({
                isError,
                transactionId
            })
            const order = await this.orderRepository.findOne({ transactionId: new Types.ObjectId(transactionId) })

            order.status = isError ? OrderStatusEnum.FAILD : OrderStatusEnum.PURCHASED
            await order.save()
            return {}
        } catch (error) {
            new HandleError(error)
        }
    }


  

}
