import { Injectable } from '@nestjs/common';
import { EmailVerificationDto, ResetPasswordDto } from '@app/common/dto/mail';
import { TransporterService } from '../transporter/transporter.service';
import { HandleError } from '@app/common/helpers';
import * as moment from 'moment';

@Injectable() 
export class MailService {
    constructor(private readonly transporterService: TransporterService) { }
 
    async emailVerification({ email, subject, token, expire }: EmailVerificationDto) {
        try {
            console.log("--")
            await this.transporterService.sendMail({
                email,
                template: 'email-verification',
                subject,
                body: {
                    token,
                    expire: moment(expire).format('DD MM YYYY hh:mm:ss'),
                },
            });
        } catch (error) {
            new HandleError(error);
        }
    }

    async resetPassword({ email, subject, token, expire }: ResetPasswordDto) {
        try {
            await this.transporterService.sendMail({
                email,
                template: 'reset-password',
                subject,
                body: {
                    token,
                    expire: moment(expire).format('DD MM YYYY hh:mm:ss'),
                },
            });
        } catch (error) {
            new HandleError(error);
        }
    }

 
}
