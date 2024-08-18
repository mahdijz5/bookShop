import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
 

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Auth extends AbstractSchema {
    @Prop({
        type: SchemaTypes.String,
        required: true,
    })
    ip: string;

    @Prop({
        type: SchemaTypes.Date,
        default: null,
    })
    resendDate?: Date;
 
    @Prop({
        type: SchemaTypes.String,
        required: false,
        trim: true,
        index: {
            unique: true,
            sparse: true,
        },
    })
    email?: string;

    @Prop({
        type: SchemaTypes.String,
        required: false,
        trim: true,
        index: {
            unique: true,
            sparse: true,
        },
    })
    username?: string;

    @Prop({
        type: SchemaTypes.String,
        required: false,
    })
    password?: string;

 
    @Prop({
        type: SchemaTypes.Boolean,
        default: false,
    })
    emailVerified?: boolean;
 
 
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
