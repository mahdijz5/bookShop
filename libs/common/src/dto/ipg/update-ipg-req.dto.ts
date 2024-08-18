import { PartialType } from "@nestjs/mapped-types";
import { CreateIpgReqDto } from "./create-ipg-req.dto";

export class UpdateIpgReqDto extends PartialType(CreateIpgReqDto) {
    id : string
}