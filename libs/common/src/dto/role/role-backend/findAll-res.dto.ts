export class FindAllResponseDto {
    data: object[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    };
}
