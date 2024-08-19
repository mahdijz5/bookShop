import { Types } from 'mongoose';

export class FindOneResponseDto {
    _id: Types.ObjectId;
    name: string;
    routing: string;
    status: boolean;
}
