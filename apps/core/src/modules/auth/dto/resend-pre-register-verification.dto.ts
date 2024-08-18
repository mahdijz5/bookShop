import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResendPreRegisterVerificationDto {
    @ApiProperty({
        type: String,
        example: 'test@gmail.com',
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
}
