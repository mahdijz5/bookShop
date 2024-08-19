import { ApiCustomeProperty } from "apps/core/src/common/decorators";
import { IsDateString } from "class-validator";

export class CreateBookDto {
    @ApiCustomeProperty({
        example: "title"
    })
    title: string;

    @ApiCustomeProperty({
        example: "author"
    })
    author: string;

    @ApiCustomeProperty({
        example: (new Date()).toISOString(),
        valueType: "date"
    })
    releaseDate: Date;


    @ApiCustomeProperty({
        example: ["drama"],
        valueType: "array"
    })
    genres: string[]

    @ApiCustomeProperty({
        example: 200000
    })
    price: number

}