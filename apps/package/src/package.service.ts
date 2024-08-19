import { Injectable } from '@nestjs/common';

@Injectable()
export class PackageService {
  getHello(): string {
    return 'Hello World!';
  }
}
