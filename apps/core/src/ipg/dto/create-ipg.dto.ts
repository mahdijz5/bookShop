import { IsString, IsObject, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({ example: 'HEADER' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ example: 'X-API-KEY' })
  @IsString()
  @IsNotEmpty()
  key!: string;
}

export class PaymentRequestParamsDTO {
  @ApiProperty({ example: 'amount' })
  @IsString()
  @IsNotEmpty()
  amount!: string;

  @ApiProperty({ example: 'callback' })
  @IsString()
  @IsNotEmpty()
  callbackUrl!: string;

  @ApiProperty({ example: 'desc' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'order_id' })
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ example: 'phone' })
  @IsString()
  @IsNotEmpty()
  mobile!: string;

  @ApiProperty({ example: 'mail' })
  @IsString()
  @IsNotEmpty()
  email!: string;
}

export class PaymentRequestResponseDTO {
  @ApiProperty({ example: 'link' })
  @IsString()
  @IsNotEmpty()
  link!: string;

  @ApiProperty({ example: 'id' })
  @IsString()
  @IsNotEmpty()
  trackId!: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  status!: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  message!: string;
}

export class PaymentRequestDTO {
  @ApiProperty({ example: 'https://api.idpay.ir/v1.1/payment' })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({ example: 'POST' })
  @IsString()
  @IsNotEmpty()
  method!: string;

  @ApiProperty({ example: 'BODY' })
  @IsString()
  @IsNotEmpty()
  param_type!: string;

  @ApiProperty({ type: AuthDTO })
  @IsObject()
  auth!: AuthDTO;

  @ApiProperty({ type: PaymentRequestParamsDTO })
  @IsObject()
  params!: PaymentRequestParamsDTO;

  @ApiProperty({ type: PaymentRequestResponseDTO })
  @IsObject()
  response!: PaymentRequestResponseDTO;
}

export class StartPayParamsDTO {
  @ApiProperty({ example: 'trackId' })
  @IsString()
  @IsNotEmpty()
  trackId!: string;
}

export class StartPayResponseDTO {
  @ApiProperty({ example: 'status' })
  @IsString()
  @IsNotEmpty()
  status!: string;

  @ApiProperty({ example: 'trackId' })
  @IsString()
  @IsNotEmpty()
  trackId!: string;

  @ApiProperty({ example: 'orderId' })
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ example: 'cardNumber' })
  @IsString()
  @IsNotEmpty()
  cardNumber!: string;

  @ApiProperty({ example: 'hashedCardNumber' })
  @IsString()
  @IsNotEmpty()
  hashedCardNumber!: string;
}

export class StartPayDTO {
  @ApiProperty({ example: 'https://gateway.zibal.ir/start' })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({ example: 'GET' })
  @IsString()
  @IsNotEmpty()
  method!: string;

  @ApiProperty({ example: 'PARAM' })
  @IsString()
  @IsNotEmpty()
  param_type!: string;

  @ApiProperty({ type: StartPayParamsDTO })
  @IsObject()
  params!: StartPayParamsDTO;

  @ApiProperty({ type: StartPayResponseDTO })
  @IsObject()
  response!: StartPayResponseDTO;
}

export class VerifyPaymentParamsDTO {
  @ApiProperty({ example: 'id' })
  @IsString()
  @IsNotEmpty()
  trackId!: string;

  @ApiProperty({ example: 'order_id' })
  @IsString()
  @IsNotEmpty()
  orderId!: string;
}

export class VerifyPaymentResponseDTO {
  @ApiProperty({ example: 'date' })
  @IsString()
  @IsNotEmpty()
  paidAt!: string;

  @ApiProperty({ example: 'status' })
  @IsString()
  @IsNotEmpty()
  status!: string;
}

export class VerifyPaymentDTO {
  @ApiProperty({ example: 'https://api.idpay.ir/v1.1/payment/verify' })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({ example: 'POST' })
  @IsString()
  @IsNotEmpty()
  method!: string;

  @ApiProperty({ example: 'BODY' })
  @IsString()
  @IsNotEmpty()
  param_type!: string;

  @ApiProperty({ type: AuthDTO })
  @IsObject()
  auth!: AuthDTO;

  @ApiProperty({ type: VerifyPaymentParamsDTO })
  @IsObject()
  params!: VerifyPaymentParamsDTO;

  @ApiProperty({ type: VerifyPaymentResponseDTO })
  @IsObject()
  response!: VerifyPaymentResponseDTO;
}

export class CreateIpgDto {
  @ApiProperty({ example: 'IDP' })
  @IsString()
  @IsNotEmpty()
  identifier!: string;

  @ApiProperty({ example: '6a7f99eb-7c20-4412-a972-6dfb7cd253a4' })
  @IsString()
  @IsNotEmpty()
  auth_key!: string;

  @ApiProperty({ example:  true })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean

  @ApiProperty({ example: 'Idpay payment gateway' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: PaymentRequestDTO })
  @IsObject()
  paymentRequest!: PaymentRequestDTO;

  @ApiProperty({ type: StartPayDTO })
  @IsObject()
  startPay!: StartPayDTO;

  @ApiProperty({ type: VerifyPaymentDTO })
  @IsObject()
  verifyPayment!: VerifyPaymentDTO;
}
