import { HttpService } from '@nestjs/axios';
import { BadGatewayException, BadRequestException, Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, NotFoundError } from 'rxjs';

import { genRandomString } from '@app/common/utils/hash';
import { compareCardNumbers } from '@app/common/utils/campare';
import { ERROR, PACKAGE_SERVICE, TRANSACTION_STATUS } from '@app/common';
import { CallbackResDto, CreatePaymentReqDto, VerifyPaymentReqDto } from '@app/common/dto';
import { MESSAGES } from '../message.enum';
import { zblConfig } from '../data';
import { Transaction } from '../models';
import { TransactionRepository } from '../repositories/transaction.repository';
import { IpgRepository } from '../repositories/ipg.repository';
import { Types } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';




@Injectable()
export class IpgHandlerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly transactionRepository: TransactionRepository,
    private readonly ipgRepository: IpgRepository,
    @Inject(PACKAGE_SERVICE) private readonly packageClient: ClientProxy
  ) {

  }

  async createPayment(data: CreatePaymentReqDto) {
    try {
      const api = "paymentRequest"
      const orderId = genRandomString()
      const apiConfig = await this.getGatewayConfig(data.gatewayId, "paymentRequest")
      const startPaymentConfig = await this.getGatewayConfig(data.gatewayId, "startPay")
      const transaction = await this.transactionRepository.save({
        ...data,
        orderId,
        gatewayId: data.gatewayId
      })

      const res: any = await this.createRequset(apiConfig["auth_key"], { ...data, orderId }, transaction.gatewayId, api)
      const { isError } = await this.handleError(transaction, res)
      if (isError) return {}

      await this.transactionRepository.updateOne({ orderId }, { trackId: res.trackId })


      return {
        link: res.link || `${startPaymentConfig["url"]}/${res.trackId}`,
        transactionId: transaction._id.toString()
      }
    } catch (error) {
      throw error
    }
  }

  async callback(data: any) {
    try {
      const values = await Object.values(data)
      const transaction = await this.transactionRepository.findOne({
        orderId: { $in: [...values] }
      })
      const convertedData = await this.createResponse(data, transaction.gatewayId, "startPay")


      const { isError, message } = await this.handleError(transaction, convertedData)
      if (isError) return {
        isError, message
      }




      await this.verifyPayment({
        orderId: transaction.orderId,
        trackId: transaction.trackId
      })


      this.packageClient.emit("callback", <CallbackResDto>{
        isError, 
        message,
        transactionId: transaction._id.toString()
      })

      return {
        isError, message
      }
    } catch (error) {
      throw error
    }
  }

  async verifyPayment(data: VerifyPaymentReqDto) {
    try {

      const transaction = await this.transactionRepository.findOne({ $or: [{ orderId: data.orderId }, { trackId: data.trackId }] })

      const apiConfig = await this.getGatewayConfig(transaction.gatewayId, "startPay")
      const res = await this.createRequset(apiConfig["auth_key"], data, transaction.gatewayId, "verifyPayment")
      const { isError } = await this.handleError(transaction, res)
      if (isError) return {}

      await this.transactionRepository.updateOne({
        _id: transaction._id
      }, {
        status: TRANSACTION_STATUS.VERIFIED,
        verifiedAt: new Date(),
        paidAt: res["paidAt"]
      })

      return {}
    } catch (error) {
      throw error
    }
  }

  private async createRequset(authKey: any, data: any, id: string, api: string) {
    const apiConfig = await this.getGatewayConfig(id, api)
    const url = apiConfig["url"]
    const method = apiConfig["method"]
    const keyList = Object.keys(apiConfig.params)
    let param = {}
    let header = {}


    for (let key of keyList) {
      const configKey = apiConfig.params[key]
      if (!configKey) continue
      param[configKey] = data[key]
    }

    const configAuth = apiConfig["auth"]
    if (configAuth) {
      if (configAuth["type"] == "HEADER") {
        header[configAuth["key"]] = authKey
        header["X-SANDBOX"] = 1 // Test mode
      } else {
        param[configAuth["key"]] = authKey
      }
    }

    const rawRes = await this.request(url, param, header, method)
    return await this.createResponse(rawRes.data, id, api)
  }

  private async createResponse(data: any, id: string, api: string): Promise<any> {

    const apiConfig = await this.getGatewayConfig(id, api)
    const keyList = Object.keys(apiConfig.response)
    let response = {}

    for (let key of keyList) {
      const configKey = apiConfig.response[key]
      if (!configKey) continue
      response[key] = data[configKey]
    }


    return response
  }

  private async request(url: string, data: any, headers, method: string) {
    try {
      const res: any = await firstValueFrom(this.httpService.request({
        url,
        method: method,
        headers: {
          ...headers
        },
        data: {
          ...data
        }
      }))
      return res
    } catch (error) {

      return error.response
    }
  }



  private async getGatewayConfig(id: string, api: string) {
    const ipg = await this.ipgRepository.findOne({ _id: new Types.ObjectId(id) })
    if (!ipg) throw new NotFoundException(ERROR.NOT_FOUND)
    return { ...ipg.config[api], auth_key: ipg["auth_key"] }
  }

  private async handleError(transaction: Transaction, response: any): Promise<{ isError: boolean, message: string }> {
    const config = await this.getGatewayConfig(transaction.gatewayId, "status")


    const status = response["status"]
    let message = response["message"]
    const error = config[status]

    if (error && error != "true") {
      if (!isNaN(error)) {
        message = MESSAGES[error]
      }

      await this.transactionRepository.updateOne({
        _id: transaction._id
      }, {
        error_message: message,
        error_code: response["status"],
        status: TRANSACTION_STATUS.FAILD
      })

      return {
        isError: true,
        message: message
      }
    }

    return {
      isError: false,
      message: " "
    }


  }
}
