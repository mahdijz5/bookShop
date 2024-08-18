import { SetMetadata } from '@nestjs/common';

export const SkipRole = () => SetMetadata('skipRole', true);
