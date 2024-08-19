import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookReqDto, UpdateBookReqDto } from '@app/common/dto/book';
import { PaginationReqDto, PaginationResDto, RemoveReqDto } from '@app/common/dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('book')
export class BookController  {
    constructor(private readonly bookService: BookService) {}
    
    @MessagePattern('book.create')
    async create(createBook: CreateBookReqDto): Promise<{}> {
        return await this.bookService.create(createBook)
    }
    
    @MessagePattern('book.findAll')
    async findAll(pagination: PaginationReqDto)  {
        return await this.bookService.findAll(pagination)
    }
    
    @MessagePattern('book.remove')
    async remove(removeBook: RemoveReqDto): Promise<{}> {
        return await this.bookService.remove(removeBook)
    }
    
    @MessagePattern('book.update')
    async update(updateBook: UpdateBookReqDto): Promise<{}> {
        return await this.bookService.update(updateBook)
    }
}
