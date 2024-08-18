import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { RequestStatus } from '@app/common';

export class EmptySuccessResponseDto {
    @ApiProperty({
        description: 'Request status',
        example: RequestStatus.SUCCESS,
    })
    status: string;

    @ApiProperty({
        description: 'HTTP Status code',
        example: HttpStatus.OK,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Always an empty object',
        example: {},
    })
    result: object;

    @ApiProperty({
        description: 'Timestamp',
        example: new Date(),
    })
    timestamp: Date;
}
