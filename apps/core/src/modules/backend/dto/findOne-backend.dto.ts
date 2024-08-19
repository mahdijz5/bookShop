import { ApiProperty } from '@nestjs/swagger';

export class FindOneBackendResultDto {
    @ApiProperty({
        example: '6497a7976ba63f02fd0da894',
    })
    _id: string;

    @ApiProperty({
        example: 'Backend',
    })
    name: string;

    @ApiProperty({
        example: 'test',
    })
    routing: string;

    @ApiProperty({
        example: true,
    })
    status: boolean;

    @ApiProperty({
        example: new Date(),
    })
    createdAt: Date;

    @ApiProperty({
        example: new Date(),
    })
    updatedAt: Date;
}
