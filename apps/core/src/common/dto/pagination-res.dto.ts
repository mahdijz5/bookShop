import { ApiCustomeProperty } from '../decorators';

export class PaginationResDto<TDocument> {
    data: TDocument[]
    base: BaseDto
}

export class BaseDto {
    @ApiCustomeProperty({ example: 2 })
    total: any
    @ApiCustomeProperty({ example: 2 })
    page: number
    @ApiCustomeProperty({ example: 2 })
    row: number
}