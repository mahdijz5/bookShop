import { PartialType ,OmitType} from "@nestjs/mapped-types";
import { CreateBookReqDto } from "./create-book-req.dto";

export class UpdateBookReqDto extends PartialType(OmitType(CreateBookReqDto,["price"])) {
        id : string
}