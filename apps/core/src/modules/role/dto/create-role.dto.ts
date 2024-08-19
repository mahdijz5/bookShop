import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Role name',
        required: true,
        type: String,
        example: 'Support',
        uniqueItems: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'description',
        required: false,
        type: String,
        example: 'description',
        uniqueItems: true,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'If true, this role sets to all users',
        required: false,
        type: Boolean,
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    isDefault: boolean;

}
