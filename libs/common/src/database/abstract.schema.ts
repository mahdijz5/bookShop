import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export abstract class AbstractSchema {

    @Prop({
        type: SchemaTypes.ObjectId,
    })
    _id: Types.ObjectId;

    @Prop({
        type: SchemaTypes.Date,
        default: null,
    })
    deletedAt?: Date;

    @Prop({
        type: SchemaTypes.Date,
        default: null,
    })
    createdAt?: Date;
    
    declare updatedAt?: Date;

}