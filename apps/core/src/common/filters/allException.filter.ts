import { ERROR } from '@app/common';
import { RequestStatus } from '@app/common/enum/requestStatus.enum';
import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

  
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const reply = host.switchToHttp().getResponse();

        let status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
        let response = exception.response || ERROR.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            response = exception.getResponse();
        }
 

        reply.status(status).send({
            status: RequestStatus.FAILURE,
            statusCode: status,
            errors: response,
            timestamp: new Date(),
        });
    }
}
