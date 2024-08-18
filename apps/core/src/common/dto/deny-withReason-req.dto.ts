import { ApiCustomeProperty } from "@app/common";

 
export class DenyWithReasonDto {
    @ApiCustomeProperty({example:"reason"})
    reason : string
}