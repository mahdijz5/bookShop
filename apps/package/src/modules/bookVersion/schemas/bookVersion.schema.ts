import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class BookVersion extends AbstractSchema {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    bookId: Types.ObjectId;

    @Prop({
        type : SchemaTypes.Number,
        required : true
    })
    price : number
 

}

export const BookVersionSchema = SchemaFactory.createForClass(BookVersion);
