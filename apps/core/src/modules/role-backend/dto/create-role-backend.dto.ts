import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleBackendIdDto {
    @ApiProperty({
        required: true,
        type: String,
        example: '64b516a02d5960e89141df4b',
        uniqueItems: true,
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    backendId: string;

    @ApiProperty({
        required: true,
        type: String,
        example: '64b516a02d5960e89141df4b',
        uniqueItems: true,
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    roleId: string;
}
