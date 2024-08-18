import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class GetUserInformationResultDto {
    @ApiProperty({
        type: String,
        example: '64b516a02d5960e89141df4b',
    })
    _id: Types.ObjectId;

    @ApiProperty({
        type: String,
        example: 'test@email.com',
    })
    email: string;

    @ApiProperty({
        type: String,
        example: '09112223344',
    })
    phone: string;

    @ApiProperty({
        type: String,
        example: 'test_username',
    })
    username: string;

    @ApiProperty({
        type: Boolean,
        example: true,
    })
    emailVerified: boolean;

    @ApiProperty({
        type: Boolean,
        example: true,
    })
    g2status: boolean;

    @ApiProperty({
        type: Boolean,
        example: true,
    })
    phoneVerified: boolean;
}
