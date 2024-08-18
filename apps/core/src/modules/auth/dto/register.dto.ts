import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        type: String,
        example: 'user_username',
    })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({
        type: String,
        example: 'user_password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
 
}

export class RegisterResultDto {
  
}
