import { ApiCustomeProperty } from "apps/core/src/common/decorators";

export class CreateBookVersionDto {
    @ApiCustomeProperty({
        example : "objectId",
        valueType : 'objectId'
    })
    bookId: string

    @ApiCustomeProperty({
        example: 200000
    })
    price: number

}