import { ApiCustomeProperty } from "@app/common"
import { IsCreditCard, IsEmail } from "class-validator"

export class CreatePaymentRDto {
    @ApiCustomeProperty({ example: "uuid" })
    gatewayId: string

    @ApiCustomeProperty({ example: 2 })
    amount: number

    @ApiCustomeProperty({ example: "http://localhost" })
    callbackUrl: string

    @ApiCustomeProperty({ example: "desc", required: false })
    description: string

    @ApiCustomeProperty({ example: "09222426875", required: false })
    mobile: string
    @ApiCustomeProperty({ example: "test@gmail.com", required: false })

    @IsEmail()
    email: string
    @ApiCustomeProperty({ example: "8778 9887 5461 6215" })
    cardNumber: string
}