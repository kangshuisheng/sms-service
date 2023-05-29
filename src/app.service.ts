import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendSms } from './app.controller';
import { SmsCode, SmsCodeDocument } from './schema/sms_code.schema';

const realUrl =
  'https://smsapi.ap-southeast-1.myhuaweicloud.com:443/sms/batchSendSms/v1'; //APP接入地址+接口访问URI
const appKey = process.env.APP_KEY;
const appSecret = process.env.APP_SECRET;
const sender = process.env.SENDER;
const templateId = process.env.TEMPLATE_ID;

@Injectable()
export class AppService {
  constructor(
    @InjectModel(SmsCode.name)
    private appService: Model<SmsCodeDocument>,
  ) {}

  async send(payload: SendSms) {
    // 生成6位随机数
    const code = Math.floor(Math.random() * 1000000);
    payload.code = code;
    return this.appService.create(payload);
  }

  async findById(id: string) {
    return this.appService.findById(id);
  }

  async delete(id: string) {
    return this.appService.findByIdAndDelete(id);
  }
}
