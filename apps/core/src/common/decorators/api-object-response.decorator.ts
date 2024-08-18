 import { RequestStatus } from '@app/common';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiObjectResponse = (status: HttpStatus, resultDto: any) => {
    return applyDecorators(
        ApiExtraModels(resultDto),
        ApiOkResponse({
            schema: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: RequestStatus.SUCCESS,
                    },
                    statusCode: {
                        type: 'number',
                        example: status,
                    },
                    result: {
                        type: 'object',
                        $ref: getSchemaPath(resultDto),
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
