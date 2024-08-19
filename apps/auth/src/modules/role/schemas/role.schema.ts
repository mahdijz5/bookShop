import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
 
@Schema({
    timestamps: true,
    versionKey: false,
})
export class Role extends AbstractSchema {
    @Prop({
        unique: true,
        trim: true,
        required: true,
        type: SchemaTypes.String,
    })
    name: string;
    
    @Prop({
        unique: false,
        trim: true,
        required: false,
        type: SchemaTypes.String,
    })
    description: string;

    @Prop({
        default: false,
    })
    isDefault?: boolean;
 
}

export const RoleSchema = SchemaFactory.createForClass(Role);
