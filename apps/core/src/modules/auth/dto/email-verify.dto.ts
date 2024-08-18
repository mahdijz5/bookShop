import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmailVerifyDto {
    @ApiProperty({
        type: String,
        example: 'fwefrgqdwl',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    code: string;

  
}

export class EmailVerifyResultDto {
    @ApiPropertyOptional({
        type: String,
        example: 'qwfweqqqqqqqqqqqqqqqewqrertrertere3errrrrrrrrrrrrrrrrrrrrhahahaharrrrrrrrrgvwef',
        nullable: true,
    })
    token?: string;
}
