import * as path from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';

let environmentPath = '';

switch (process.env.ENV) {
  case 'dev': {
    environmentPath = '.env.dev';
    break;
  }

  case 'staging': {
    environmentPath = '.env.staging';
    break;
  }

  case 'prod': {
    environmentPath = '.env.prod';
    break;
  }
}

config({ path: environmentPath });

const isDev = process.env.ENV === 'dev';
console.log('isDev: ', isDev);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: environmentPath }),
    EventEmitterModule.forRoot({ wildcard: true }),
    AuthModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        ssl: !isDev,
        sslValidate: true,
        sslCA: path.join(
          __dirname,
          configService.get<string>('MONGO_DB_CERTIFICATE_PATH'),
        ),
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot({
      ttl: 3,
      limit: 6,
    }),
    ConfigModule,
    ProductModule,
    StockModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
