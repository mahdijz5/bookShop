import { Types } from 'mongoose';

export class FindOneResponseDto {
    _id: Types.ObjectId;
    name: string;
    isDefault?: boolean;
    status?: boolean;
}
