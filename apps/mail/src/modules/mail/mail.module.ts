import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { TransporterModule } from '../transporter/transporter.module';

@Module({
    imports : [TransporterModule],
    controllers: [MailController],
    providers: [MailService],
})
export class MailModule {}
