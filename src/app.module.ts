import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoModuleConfig } from 'config/mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsCode, SmsCodeSchema } from './schema/sms_code.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(MongoModuleConfig),
    MongooseModule.forFeature([
      {
        name: SmsCode.name,
        schema: SmsCodeSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
