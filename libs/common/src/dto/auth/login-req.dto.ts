
export class LoginReqDto {
    username?: string;
    email?: string;
    password: string;
}
export class LoginResDto {
    token: string;
    roles: Array<object>;
}