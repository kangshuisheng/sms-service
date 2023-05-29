import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const port = Number(process.env.PORT);
  const isDev = process.env.NODE_ENV === 'development';
  const host = isDev ? '::' : 'sms-service';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
        host,
      },
    },
  );
  app.listen();
}
bootstrap();
