import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class CartBook extends AbstractSchema {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    cartId: Types.ObjectId

    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    bookId: Types.ObjectId

    @Prop({
        type: SchemaTypes.Number,
        default: 1
    })
    quantity: number

}

export const CartBookSchema = SchemaFactory.createForClass(CartBook);
