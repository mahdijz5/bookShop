import { AbstractSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
 
@Schema({
    timestamps: true,
    versionKey: false,
})
export class RoleBackend extends AbstractSchema  {
    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
    })
    roleId: Types.ObjectId;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
    })
    backendId: Types.ObjectId;
}

export const RoleBackendSchema = SchemaFactory.createForClass(RoleBackend).index(
    { roleId: 1, backendId: 1 },
    { unique: true },
)   
