import { ApiProperty } from '@nestjs/swagger';

export class FindOneRoleResultDto {
    @ApiProperty({
        example: '6497a7976ba63f02fd0da894',
    })
    _id: string;

    @ApiProperty({
        example: 'User',
    })
    name: string;

    @ApiProperty({
        example: new Date(),
    })
    createdAt: Date;

    @ApiProperty({
        example: new Date(),
    })
    updatedAt: Date;
}
