import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmailUpdatePasswordDto {
    @ApiProperty({
        type: String,
        example: 'fwefrgqdwl',
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        type: String,
        example: 'wqddwger',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
