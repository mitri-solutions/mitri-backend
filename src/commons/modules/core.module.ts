import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFindOperator, MongoUpdateOperator } from '../operator';
import { MongoConfigService, BullConfigService } from '../services';

import {
  default as config
} from "@configs/env.config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
  ],
  providers: [MongoFindOperator, MongoUpdateOperator],
  exports: [MongoFindOperator, MongoUpdateOperator],
})
export class CoreModule {}
