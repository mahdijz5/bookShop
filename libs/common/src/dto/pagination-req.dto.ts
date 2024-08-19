export class PaginationReqDto {
    base?: {
        order?: any
        page?: number
        row?: number
    }
    filter?: any = {}
    field?: string
}

export class PaginationWalletAddressReqDto extends PaginationReqDto {
    walletAddress: string
}

export class PaginationUserIdReqDto extends PaginationReqDto {
    userId: string
}