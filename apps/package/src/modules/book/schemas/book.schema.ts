import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { title } from 'process';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class Book extends AbstractSchema {
    @Prop({
        type: SchemaTypes.String,
        required: true,
    })
    title: string;

    @Prop({
        type: SchemaTypes.String,
        required: true,
    })
    author: string;

    @Prop({
        type: SchemaTypes.Date,
        required: true,
    })
    releaseDate: Date;

    @Prop({
        type : SchemaTypes.Array,
        default : []
    })
    genres : string[]

}

export const BookSchema = SchemaFactory.createForClass(Book).index(
    {title : 1, author : 1},
    {}
)
