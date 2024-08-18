import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({
        example: 100,
    })
    total: number;

    @ApiProperty({
        example: 1,
        minimum: 1,
    })
    page: number;

    @ApiProperty({
        example: 10,
        maximum: 10,
        minimum: 1,
    })
    limit: number;
}
