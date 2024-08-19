import { Injectable } from '@nestjs/common';
import { CartBookRepository, CartRepository } from './repositories';
import { CreateCartReqDto, SetToCartReqDto } from '@app/common/dto';
import { HandleError } from '@app/common/helpers';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly cartBookRepository: CartBookRepository,
    ) { }

    async create(createCart: CreateCartReqDto) {
        try {
            await this.cartRepository.save({
                userId: new Types.ObjectId(createCart.userId),
            })
            return {}
        } catch (error) {
            new HandleError(error)
        }
    }

    async setToCart(data: SetToCartReqDto) {
        try {
            const cart = await this.cartRepository.findOne({
                userId: new Types.ObjectId
                    (data.authId)
            })

            const filter = {
                cartId: cart._id,
                bookId: new Types.ObjectId(data.bookId)
            }

            if (data.quantity <= 0) {
                await this.cartBookRepository.delete(filter)
                return {}
            }

            const isExist = await this.cartBookRepository.findOne(filter)
            console.log(isExist)
 
            if (isExist) {
                await this.cartBookRepository.updateOne(filter, { quantity: data.quantity })
            } else {
                await this.cartBookRepository.save({
                    ...filter,
                    quantity: data.quantity
                })
            }

            return {}
        } catch (error) {
            new HandleError(error)
        }
    }

}
