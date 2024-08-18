import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '../dto';
import { RequestStatus } from '@app/common';
 

export const ApiFindAllResponse = (resultDto) => {
    return applyDecorators(
        ApiExtraModels(PaginationDto, resultDto),
        ApiOkResponse({
            description: 'FindOne Response',
            schema: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: RequestStatus.SUCCESS,
                    },
                    statusCode: {
                        type: 'number',
                        example: HttpStatus.OK,
                    },
                    result: {
                        type: 'object',
                        properties: {
                            data: {
                                oneOf: [
                                    {
                                        type: 'array',
                                        example: [],
                                    },
                                    {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            $ref: getSchemaPath(resultDto),
                                        },
                                    },
                                ],
                            },
                            pagination: {
                                type: 'object',
                                $ref: getSchemaPath(PaginationDto),
                            },
                        },
                    },
                    timestamp: {
                        type: 'Date',
                        example: new Date(),
                    },
                },
            },
        }),
    );
};
