import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const exceptionFactory = (validationErrors: ValidationError[]) => {
    const errorMessages = [];
    let keyCode = 2000;

    for (const validationError of validationErrors) {
        if (validationError.constraints) {
            Object.values(validationError.constraints).forEach((errorMessage) => {
                errorMessages.push({
                    key: keyCode++,
                    value: errorMessage,
                });
            });
        } else if (validationError.children && validationError.children[0].constraints) {
            for (const error of Object.values(validationError.children[0].constraints)) {
                errorMessages.push({
                    key: keyCode++,
                    value: error,
                });
            }
        }
    }

    return {
        status: HttpStatus.BAD_REQUEST,
        response: errorMessages,
    };
};
