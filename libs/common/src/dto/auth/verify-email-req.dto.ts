 

export class EmailVerifyReqDto {
    fp: string;
    ip: string;
    code: string;
}

export class EmailVerifyResDto {
    token?: string;
}
