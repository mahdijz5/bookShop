import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
 import { VERIFICATION_TEMP_EXPIRE_TIME } from '@app/common/constants';
import { AbstractSchema } from '@app/common';

@Schema({
    timestamps: true,
    versionKey: false,
})
export class EmailVerificationTemp extends AbstractSchema {
    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
    })
    authId: Types.ObjectId;

    @Prop({
        type: SchemaTypes.String,
        required: true,
    })
    fp: string;

    @Prop({
        type: SchemaTypes.String,
        required: true,
    })
    ip: string;

    @Prop({
        type: SchemaTypes.String,
        required: true,
    })
    code: string;
}

export const EmailVerificationTempSchema = SchemaFactory.createForClass(
    EmailVerificationTemp,
).index({ createdAt: 1 }, { expireAfterSeconds: VERIFICATION_TEMP_EXPIRE_TIME });
