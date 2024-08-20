import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailVerificationDto, ResetPasswordDto } from '@app/common/dto/mail';
import { MailService } from './mail.service';

@Controller()
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @EventPattern('email-verification')
    async emailVerification(@Payload() emailVerificationDto: EmailVerificationDto) {
        await this.mailService.emailVerification(emailVerificationDto);
    }


    @EventPattern('reset-password')
    async resetPassword(@Payload() resetPasswordDto: ResetPasswordDto) {
        await this.mailService.resetPassword(resetPasswordDto);
    }

}
