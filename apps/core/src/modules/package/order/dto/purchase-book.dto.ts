import { ApiCustomeProperty } from "apps/core/src/common/decorators";

export class PurchaseBookDto {
    @ApiCustomeProperty({valueType : "objectId"})
    gatewayId : string
}

export class PurchaseBookResDto {
    @ApiCustomeProperty({example : "https://example.com"})
    link : string
}