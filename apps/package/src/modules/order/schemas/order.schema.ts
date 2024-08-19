import { AbstractSchema, OrderStatusEnum } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class Order extends AbstractSchema {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    userId: Types.ObjectId

    @Prop({
        type: SchemaTypes.Number,
        required: true,
    })
    totalPrice: number

    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    transactionId: Types.ObjectId
    
    @Prop({
        type: SchemaTypes.String,
        required: true,
        default : OrderStatusEnum.PENDING
    })
    status: OrderStatusEnum

}

export const OrderSchema = SchemaFactory.createForClass(Order);
