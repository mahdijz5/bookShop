import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
 import {
    CreateRequestDto,
    FindOneRequestDto,
    RemoveRequestDto,
    UpdateRequestDto,
} from '@app/common/dto/role/backend';
import { PaginationReqDto  } from '@app/common/dto';
import { BackendService } from './backend.service';
 

@Controller()
export class BackendController {
    constructor(private readonly backendService: BackendService) { }

    @MessagePattern('backend.create')
    async create(@Payload() createRequestDto: CreateRequestDto) {
        return await this.backendService.create(
            createRequestDto.name,
            createRequestDto.routing,
            createRequestDto.method,
        );
    }

    @MessagePattern('backend.findAll')
    async findAll(@Payload() data: PaginationReqDto) {
        return await this.backendService.findAll(data);
    }

    @MessagePattern('backend.findOne')
    async findOne(@Payload() findOneRequestDto: FindOneRequestDto) {
        return await this.backendService.findOne(findOneRequestDto.backendId);
    }

    @MessagePattern('backend.update')
    async update(@Payload() updateRequestDto: UpdateRequestDto) {
        return await this.backendService.update(
            updateRequestDto.backendId,
            updateRequestDto.name,
            updateRequestDto.routing 
        );
    }

    @MessagePattern('backend.remove')
    async remove(@Payload() removeRequestDto: RemoveRequestDto) {
        return await this.backendService.remove(removeRequestDto.backendId);
    }

   
}
