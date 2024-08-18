import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ObjectIdDto {
    @ApiProperty({
        example: '649ab98e5c98e8c94ecfc7f4',
    })
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}
