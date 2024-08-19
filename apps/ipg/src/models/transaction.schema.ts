 import { AbstractSchema } from "@app/common";
import { TRANSACTION_STATUS } from "@app/common/enum/transactionStatus.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false,timestamps : true })
export class Transaction extends AbstractSchema {
    @Prop()
    cardNumber : string
    
    @Prop()
    amount : number
    
    @Prop()
    callbackUrl : string
    
    @Prop({required :false})
    description ?: string
    
    @Prop({required :false})
    mobile ?: string
    
    @Prop({required :false})
    email ?: string  

    @Prop({required :false})
    trackId? : string  
    
    @Prop({required :false})
    orderId? : string  
    
    @Prop({required :false,type : SchemaTypes.Date})
    paidAt ?: Date  
    
    @Prop({required :false,type : SchemaTypes.Date})
    verifiedAt? : Date  
    
    @Prop({required :false,type : SchemaTypes.String,default : TRANSACTION_STATUS.PENDING})
    status? : TRANSACTION_STATUS
    
    @Prop({required :false})
    error_message? : string 

    @Prop({required :false})
    error_code? : string  
 
    @Prop({required :false,type : SchemaTypes.ObjectId})
    gatewayId? : any
  
}

 
export const TransactionSchema = SchemaFactory.createForClass(Transaction)  