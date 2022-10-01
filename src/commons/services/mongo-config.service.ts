import { Injectable } from "@nestjs/common";
import {
  MongooseModuleFactoryOptions,
  MongooseOptionsFactory
} from "@nestjs/mongoose";
import {envConfig}  from "@configs/env.config";

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor() {}

  createMongooseOptions():
    | Promise<MongooseModuleFactoryOptions>
    | MongooseModuleFactoryOptions {
    return {
      uri: envConfig.MONGODB_URL
    };
  }
}
