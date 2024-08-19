import { ApiCustomeProperty } from "apps/core/src/common/decorators"

export class BackendDto {
    @ApiCustomeProperty({example : "name"})
    name: string 
    @ApiCustomeProperty({example : "routing"})
    routing : string
}