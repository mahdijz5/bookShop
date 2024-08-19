import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class Backend extends AbstractSchema {
    @Prop({
        unique: true,
        trim: true,
        required: true,
        type: SchemaTypes.String,
    })
    name: string;

    @Prop({
        trim: true,
        required: true,
        type: SchemaTypes.String,
    })
    routing: string;

 
}

export const BackendSchema = SchemaFactory.createForClass(Backend);
