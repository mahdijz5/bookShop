import { PaginationReqDto } from "../../pagination-req.dto";

export class FindBackendsRequestDto extends PaginationReqDto {
    roleId: string;
}
