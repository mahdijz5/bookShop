export class EmailUpdatePasswordReqDto {
    fp: string;
    ip: string;
    code: string;
    password: string;
    userAgent: string;
}