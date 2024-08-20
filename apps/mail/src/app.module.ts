import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common/rmq';
import { TransporterModule } from './modules/transporter/transporter.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/mail/.env',
        }),
        RmqModule,
        TransporterModule,
        MailModule,
    ],
})
export class AppModule {}
