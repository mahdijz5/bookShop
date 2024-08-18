import { HttpService } from '@nestjs/axios';
import { BadGatewayException, BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import { genRandomString } from '@app/common/utils/hash';
import { compareCardNumbers } from '@app/common/utils/campare';
import { ERROR, TRANSACTION_STATUS } from '@app/common';
import { CreatePaymentReqDto, PaginationReqDto, PaginationResDto, RemoveReqDto, VerifyPaymentReqDto } from '@app/common/dto';
import { MESSAGES } from '../message.enum';
import { zblConfig } from '../data';
import { Transaction } from '../models';
import { TransactionRepository } from '../repositories/transaction.repository';
import * as fs from 'fs-extra';
import * as path from 'path';
import { IpgRepository } from '../repositories/ipg.repository';
import { CreateIpgReqDto } from '@app/common/dto/ipg/create-ipg-req.dto';
import { UpdateIpgReqDto } from '@app/common/dto/ipg/update-ipg-req.dto';
import { Types } from 'mongoose';
import { HandleError } from '@app/common/helpers';



@Injectable()
export class IpgService {
  constructor(
    private readonly httpService: HttpService,
    private readonly ipgRepository: IpgRepository,
  ) {
    // this.create("IDP")
  }
 

  async getAllJsonFiles(): Promise<any[]> {
    const pathDir = path.join(__dirname, '..', "..", "..", 'formats')
    const files = await fs.readdir(pathDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(pathDir, file);
        const content = await fs.readJson(filePath);
        return content;
      })
    );
    return data;
  }

  async insertFromJson(identifier: string) {
    try {
 
      const files = await this.getAllJsonFiles()
      const item = files.find((item) => item.identifier == identifier)

      await this.ipgRepository.create({
        auth_key: item.auth_key,
        config: item,
        name: item.name,
        identifier: item.identifier,

      })
      return {}
    } catch (error) {
      new HandleError(error)
    }
  }

  async findAll({
    base: {
      order,
      page,
      row
    },
    field,
    filter
  }: PaginationReqDto) {
    try {
      const gateways = await this.ipgRepository.findAndCount(
        filter,
        {
          deletedAt: 0,
          updatedAt: 0,
        },
        page,
        field,
        order,
        row,
      );

      console.log(gateways)

      return new PaginationResDto(gateways.result, { page, row, total: gateways.count })
    } catch (error) {
      new HandleError(error)
    }
  }

  async create(data: CreateIpgReqDto) {
    try {
      await this.ipgRepository.create({
        ...data,
        config: {
          ...data
        }
      })
      return {}
    } catch (error) {
      new HandleError(error)
    }
  }

  async update(data: UpdateIpgReqDto) {
    try {
      console.log(data)
      await this.ipgRepository.update({
        _id: new Types.ObjectId(data.id),
      }, {
        ...data
      })
      return {}
    } catch (error) {
      new HandleError(error)
    }
  }

  async remove({ id }: RemoveReqDto) {
    try {
      await this.ipgRepository.remove({
        _id: new Types.ObjectId(id)
      })
      return {}
    } catch (error) {
      new HandleError(error)
    }
  }

}