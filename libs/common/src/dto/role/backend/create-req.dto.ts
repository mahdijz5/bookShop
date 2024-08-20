import { RouteMethod } from "@app/common/enum"

 

export class CreateRequestDto {
    name: string 
    routing: string
    method : RouteMethod
     
}
