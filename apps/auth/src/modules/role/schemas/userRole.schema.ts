import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

 
@Schema({
    timestamps: true,
    versionKey: false,
})
export class UserRole extends AbstractSchema {
    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
    })
    userId: Types.ObjectId;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
    })
    roleId: Types.ObjectId;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole).index(
    { userId: 1, roleId: 1 },
    { unique: true },
);
