import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MicroserviceEvent } from 'microservice_event';
import { AppService } from './app.service';
interface SendSms {
  phone: string;
  code?: number;
}
@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(MicroserviceEvent.send)
  send(payload: SendSms) {
    return this.appService.send(payload);
  }

  @MessagePattern(MicroserviceEvent.findById)
  findById(id: string) {
    return this.appService.findById(id);
  }

  @MessagePattern(MicroserviceEvent.delete)
  delete(id: string) {
    return this.appService.delete(id);
  }
}
export { AppController, SendSms };
