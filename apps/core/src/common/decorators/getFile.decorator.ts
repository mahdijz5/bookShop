import { ERROR } from '@app/common';
import { BadGatewayException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetFile = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const method = ctx.getHandler().name;
    const controller = ctx.getClass().name;
    const file = await request.file()
    let mimeType = (file.mimetype.split("/")[1]).toLocaleLowerCase()

    return file;
  },
);