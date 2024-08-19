import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class Cart extends AbstractSchema {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
        unique:true
    })
    userId : Types.ObjectId

}

export const CartSchema = SchemaFactory.createForClass(Cart);
