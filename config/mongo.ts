import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const MongoModuleConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule.forRoot(), ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const isDev =
      config.get<string>('NODE_ENV') === 'development' ||
      config.get<string>('NODE_ENV') === 'test';
    const dbUrl = config.get<string>('MONGODB_URL');
    const auth = config.get<string>('MONGO_AUTH_SOURCE');
    const dbName = isDev
      ? config.get<string>('TEST_COLLECTION')
      : config.get<string>('PROD_COLLECTION');
    return {
      uri: `${dbUrl}/${dbName}?authSource=${auth}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
};
