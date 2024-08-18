import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { RequestStatus } from '@app/common';
import { HttpStatus } from '@nestjs/common';

class KeyValueErrorDto {
    @ApiProperty({
        description: 'Error key',
        example: 2999,
    })
    key: number;

    @ApiProperty({
        description: 'Error value',
        example: 'Something is already exists.',
    })
    value: string;
}

@ApiExtraModels(KeyValueErrorDto)
export class ApiBadRequestResponseDto {
    @ApiProperty({
        description: 'Request status',
        example: RequestStatus.FAILURE,
    })
    status: string;

    @ApiProperty({
        description: 'HTTP Status code',
        example: HttpStatus.BAD_REQUEST,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Validation errors in array, and exceptions in object',
        oneOf: [
            {
                type: 'object',
                $ref: getSchemaPath(KeyValueErrorDto),
            },
            {
                type: 'array',
                items: {
                    type: 'object',
                    $ref: getSchemaPath(KeyValueErrorDto),
                },
            },
        ],
    })
    errors: KeyValueErrorDto | KeyValueErrorDto[];

    @ApiProperty({
        description: 'Timestamp',
        example: new Date(),
    })
    timestamp: Date;
}
