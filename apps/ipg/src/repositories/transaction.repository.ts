import { AbstractRepository } from "@app/common/database";
 import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "../models";

export class TransactionRepository extends AbstractRepository<Transaction> {
    protected readonly logger = new Logger(TransactionRepository.name)

    constructor(@InjectModel(Transaction.name) private readonly userRepository: Model<Transaction>) {
        super(userRepository)
    }
} 