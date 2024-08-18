import { ApiCustomeProperty } from "../decorators/custom.apiProperty.decorator";

export class ReasonDto {
    @ApiCustomeProperty({example:"reason"})
    reason : string
}