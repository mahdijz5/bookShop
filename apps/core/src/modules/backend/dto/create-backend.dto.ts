import { RouteMethod } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBackendDto {
    @ApiProperty({
        required: true,
        type: String,
        example: 'Backend',
        uniqueItems: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        type: String,
        example: 'Backend',
        uniqueItems: true,
    })
    @IsString()
    @IsNotEmpty()
    routing: string;


    @ApiProperty({
        required: true,
        type: String,
        enum : RouteMethod,
        example: RouteMethod.POST,
    })
    @IsEnum(RouteMethod)
    @IsNotEmpty()
    method: RouteMethod;
 
}
