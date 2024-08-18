import { Types } from "mongoose";

export class GetUserInformationReqDto {
    id: string;
}

export class GetUserInformationResDto {
    _id: Types.ObjectId;
    email: string;
    phone: string;
    username: string; 
    emailVerified: boolean;
    g2status: boolean; 
    phoneVerified: boolean;
}
