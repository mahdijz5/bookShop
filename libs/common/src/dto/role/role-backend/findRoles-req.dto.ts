import { PaginationReqDto } from "../../pagination-req.dto";

export class FindRolesRequestDto extends PaginationReqDto {
    backendId: string;
}
