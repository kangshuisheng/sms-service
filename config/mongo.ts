import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const MongoModuleConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule.forRoot(), ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const nodeEnv = config.get<string>('NODE_ENV');
    const isDev = nodeEnv === 'development' || nodeEnv === 'test';
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
