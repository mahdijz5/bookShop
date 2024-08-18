import { AbstractRepository } from "@app/common/database";
 import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ipg } from "../models/ipg.schema";
 
export class IpgRepository extends AbstractRepository<Ipg> {
    protected readonly logger = new Logger(IpgRepository.name)

    constructor(@InjectModel(Ipg.name) private readonly userRepository: Model<Ipg>) {
        super(userRepository)
    }
} 