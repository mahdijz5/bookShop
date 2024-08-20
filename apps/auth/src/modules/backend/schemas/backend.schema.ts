import { AbstractSchema, RouteMethod } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';


@Schema({
    timestamps: true,
    versionKey: false,
})
export class Backend extends AbstractSchema {
    @Prop({
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

    @Prop({
        required: true,
        type: SchemaTypes.String,
    })
    method: RouteMethod;


}

export const BackendSchema = SchemaFactory.createForClass(Backend);
