import { PartialType } from "@nestjs/swagger";
import { CreateIpgDto } from "./create-ipg.dto";

export class UpdateIpgDto extends PartialType(CreateIpgDto) {
}