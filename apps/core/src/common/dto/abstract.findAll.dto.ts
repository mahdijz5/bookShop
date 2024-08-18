import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export abstract class AbstractFindAllDto {
    @ApiPropertyOptional({
        type: String,
        example: 'id',
    })
    @IsString()
    @IsOptional()
    sort?: string = 'id';

    @ApiPropertyOptional({
        type: Number,
        enum: [1, -1],
        default: -1,
    })
    @IsNumber()
    @IsOptional()
    order?: number = -1;

    @ApiPropertyOptional({
        type: Number,
        minimum: 1,
        maximum: 10,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(10)
    @IsOptional()
    limit?: number = 10;

    @ApiPropertyOptional({
        type: Number,
        example: 1,
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsNumber()
    @IsOptional()
    page?: number = 1;
}
