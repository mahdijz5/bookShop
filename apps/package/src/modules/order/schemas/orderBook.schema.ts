import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class OrderBook extends AbstractSchema {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    orderId : Types.ObjectId
    
    @Prop({ 
        type: SchemaTypes.ObjectId,
        required: true,
    })
    bookVersionId : Types.ObjectId
    
    @Prop({
        type: SchemaTypes.Number,
        default: 1
    })
    quantity: number

}

export const OrderBookSchema = SchemaFactory.createForClass(OrderBook);
