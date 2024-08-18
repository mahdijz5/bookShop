import { BadRequestException, HttpException, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ERROR } from '../enum';
 
const logger = new Logger('----- Error handler -----');
export class LogError {
    constructor(error) {
        console.log(error)
    }
}

export class HandleError {
    constructor(error) {
        console.log("err--------------")
        new LogError(error)

        if (error instanceof HttpException) {
            throw new RpcException(error);
        }

        if (error.name == "CastError" && error.kind == "ObjectId") {
            this.mongooseIncorrectObject(error)
        }

        if (error.name === 'MongoServerError' && error.code === 11000) {
            this.mongooseDuplicateError(error);
        }


       


        throw error;
    }

    private mongooseDuplicateError(error) {
        throw new RpcException(new BadRequestException(ERROR.ALREADY_EXISTS));
    }


  

    private mongooseIncorrectObject(error) {
        throw new RpcException(new BadRequestException(ERROR.MONGO_INCORRECT_ID));
    }
 
}
