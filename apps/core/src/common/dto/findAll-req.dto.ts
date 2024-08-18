import { Type } from "class-transformer"
import { BaseDto } from "./base-req.dto"
import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class FindAllReqDto {
    @ApiPropertyOptional({
        type : () => BaseDto,
        example : <BaseDto>{
            order : -1,
            page :1,
            row : 10
        }
    })
    @Type(() => BaseDto)
    @ValidateNested()
    base?: BaseDto = new BaseDto()

    @ApiPropertyOptional({
        description: 'Sorting by this field',
        type: String,
        example: 'createdAt',
    })
    @IsString()
    @IsOptional()
    field?: string = "createdAt"

    @ApiPropertyOptional({
        description: 'filter In adminstator api it goes directly search in database',
        type: String,
        example: {
         },
    })
    @IsObject()
    @IsOptional()
    filter?: any = {}

    @ApiPropertyOptional({
        description: 'filter In adminstator api it goes directly search in database',
        type: String,
        example: {
         },
    })
    @IsObject()
    @IsOptional()
    search?: any = {}
}
