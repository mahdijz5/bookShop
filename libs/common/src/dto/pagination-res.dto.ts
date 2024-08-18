import { MetaDto } from "./Base.dto"

export class PaginationResDto  {
    data: any[]
    base: MetaDto

    constructor(data : any[],base : MetaDto ){
        this.data = data
        this.base = base
    }
}
