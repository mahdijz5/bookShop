import { ApiCustomeProperty } from "apps/core/src/common/decorators"

export class SetToCartDto {
    @ApiCustomeProperty({example : "objectId",valueType:'objectId'})
    bookId: string
    @ApiCustomeProperty({example : 2})
    quantity: number
}