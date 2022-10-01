import { Injectable } from "@nestjs/common";
import {envConfig} from "@configs/env.config";
import { QueueOptions } from "bull";
import { SharedBullConfigurationFactory } from "@nestjs/bull";


@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor() {
  }

  createSharedConfiguration(): Promise<QueueOptions> | QueueOptions {
    return {
      redis: {
        host: envConfig.REDIS_HOST,
        port: envConfig.REDIS_PORT
      }
    };
  }
}
