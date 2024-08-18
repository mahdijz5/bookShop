import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        type: String,
        example: 'user_username',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    username : string;

 

    @ApiProperty({
        type: String,
        example: 'user_password',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

class RoleResultDto {
    @ApiProperty({
        type: String,
        example: '64b516a02d5960e89141df4b',
    })
    _id: string;

   
}

export class LoginResultDto {
    @ApiProperty({
        type: String,
        example: 'qwfweqqqqqqqqqqqqqqqewqrertrertere3errrrrrrrrrrrrrrrrrrrrhahahaharrrrrrrrrgvwef',
    })
    token: string;

    @ApiProperty({
        type: RoleResultDto,
        isArray: true,
    })
    roles: Array<RoleResultDto>;
}
