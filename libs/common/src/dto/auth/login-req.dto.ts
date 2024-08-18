
export class LoginReqDto {
    username: string;
    password: string;
}
export class LoginResDto {
    token: string;
    roles: Array<object>;
}