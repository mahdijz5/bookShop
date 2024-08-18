export class AuthDTO {
    type!: string;
    key!: string;
}

export class PaymentRequestParamsDTO {
    amount!: string;
    callbackUrl!: string;
    description!: string;
    orderId!: string;
    mobile!: string;
    email!: string;
}

export class PaymentRequestResponseDTO {
    link!: string;
    trackId!: string;
    status!: string;
    message!: string;
}

export class PaymentRequestDTO {
    url!: string;
    method!: string;
    param_type!: string;
    auth!: AuthDTO;
    params!: PaymentRequestParamsDTO;
    response!: PaymentRequestResponseDTO;
}

export class StartPayParamsDTO {
    trackId!: string;
}

export class StartPayResponseDTO {
    status!: string;
    trackId!: string;
    orderId!: string;
    cardNumber!: string;
    hashedCardNumber!: string;
}

export class StartPayDTO {
    url!: string;
    method!: string;
    param_type!: string;
    params!: StartPayParamsDTO;
    response!: StartPayResponseDTO;
}

export class VerifyPaymentParamsDTO {
    trackId!: string;
    orderId!: string;
}

export class VerifyPaymentResponseDTO {
    paidAt!: string;
    status!: string;
}

export class VerifyPaymentDTO {
    url!: string;
    method!: string;
    param_type!: string;
    auth!: AuthDTO;
    params!: VerifyPaymentParamsDTO;
    response!: VerifyPaymentResponseDTO;
}
 
export class CreateIpgReqDto {
    identifier!: string;
    auth_key!: string;
    name!: string;
    paymentRequest!: PaymentRequestDTO;
    startPay!: StartPayDTO;
    verifyPayment!: VerifyPaymentDTO;
}