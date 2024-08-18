import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IpgHandlerService } from '../services/handler.service';
import { IpgService } from '../services/ipg.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERN } from '@app/common';
import { CreateIpgReqDto, CreatePaymentReqDto, PaginationReqDto, RemoveReqDto, UpdateIpgReqDto } from '@app/common/dto';

@ApiTags("IPG")
@Controller({ path: "ipg", version: "1" })
export class IpgController {
  constructor(
    private readonly ipgHandlerService: IpgHandlerService,
    private readonly ipgService: IpgService
  ) { }

  @MessagePattern(MESSAGE_PATTERN.IPG.PAYMENT_CALLBACK)
  async callback(@Payload() callback: any) {
    return this.ipgHandlerService.callback({ ...callback })
  }

  @MessagePattern(MESSAGE_PATTERN.IPG.PAYMENT)
  async createPayment(@Payload() createPayment: CreatePaymentReqDto) {
    return this.ipgHandlerService.createPayment({ ...createPayment })
  }


  @MessagePattern(MESSAGE_PATTERN.IPG.CREATE)
  async create(@Payload() create: CreateIpgReqDto) {
    return this.ipgService.create(create)
  }

  @MessagePattern(MESSAGE_PATTERN.IPG.UPDATE)
  async update(@Payload() update: UpdateIpgReqDto) {
    return this.ipgService.update(update)
  }

  @MessagePattern(MESSAGE_PATTERN.IPG.REMOVE)
  async remove(@Payload() remove: RemoveReqDto) {
    return this.ipgService.remove(remove)
  }

  @MessagePattern(MESSAGE_PATTERN.IPG.FINDALL)
  async findAll(@Payload() findAll: PaginationReqDto) {
    return this.ipgService.findAll(findAll)
  }

  @MessagePattern(MESSAGE_PATTERN.IPG.FINDALL_JSON)
  async findAllFromJson() {
    return this.ipgService.getAllJsonFiles()
  }

  @MessagePattern(MESSAGE_PATTERN.IPG.INSERT_FROMJSON)
  async insertFromJson(@Payload("identifier") identifier: string) {
    return this.ipgService.insertFromJson(identifier)
  }
}
