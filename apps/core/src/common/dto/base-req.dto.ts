import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class BaseDto {
    @ApiProperty({
        example : "DESC",
        required : false
    })
    @IsOptional()
    order: any = -1
 
    @ApiProperty({
        type : Number,
        example : "createdAt",
        required : false
    })
    @IsNumber()
    @IsOptional()
    page: number = 1

    @ApiProperty({
        type : Number,
        example : "createdAt",
        required : false
    })
    @IsNumber()
    @IsOptional()
    row: number = 10
} 
