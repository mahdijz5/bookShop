export class CreatePaymentReqDto {
    gatewayId : string
    amount : number
    callbackUrl : string
    description? : string
    mobile ?: string
    email ?: string  
 }