import { Injectable } from '@nestjs/common';
import { BookVersionService } from './bookVersion.service';
import { CreateBookVersionReqDto, FindAllOfBookReqDto, PaginationResDto } from '@app/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class BookVersionController   {
    constructor(
        private readonly bookVersionService: BookVersionService,
    ) {
    }


    @MessagePattern("bookVersion.create")
    async create(@Payload() createBookVersion: CreateBookVersionReqDto): Promise<{}> {
        return await this.bookVersionService.create(createBookVersion)
    }
    
    @MessagePattern("bookVersion.findAll")
    async findAllVersions(pagination: FindAllOfBookReqDto): Promise<PaginationResDto> {
        return await this.bookVersionService.findAllVersions(pagination)
    }



}
