import { AbstractDocument } from "@app/common/database";
import { TRANSACTION_STATUS } from "@app/common/enum/transactionStatus.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes } from "mongoose";

@Schema({ versionKey: false })
export class Ipg extends AbstractDocument {
    @Prop({unique : true})
    identifier : string

    @Prop()
    name : string
    
    @Prop({required :false}) 
    description? : boolean
     
    @Prop({required :false})
    auth_key?: string

    @Prop({default : false})
    enabled?: boolean
    
    @Prop({type : SchemaTypes.Mixed})
    config?: any  
}

 
export const IpgSchema = SchemaFactory.createForClass(Ipg)  