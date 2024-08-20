import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';
import { HandleError } from '@app/common/helpers';

@Injectable()
export class TransporterService {
    private readonly transporter = createTransport({
        service: 'gmail',
        auth: {
            user: this.configService.getOrThrow('EMAIL_USERNAME'),
            pass: this.configService.getOrThrow('EMAIL_PASSWORD'),
        },
        ignoreTLS: false,
    });


    constructor(private readonly configService: ConfigService) { }

    async sendMail(sendMailDto: SendMailDto) {
        try {
            await this.transporter.sendMail({
                from: this.configService.getOrThrow('EMAIL_USERNAME'),
                to: sendMailDto.email,
                subject: sendMailDto.subject,
                html: JSON.stringify({ ...sendMailDto.body })
            });
        } catch (error) {
            new HandleError(error);
        }
    }
}
