import { Module } from "@nestjs/common";
import { UserModule } from "@modules/user/user.module";
import {
  default as config
} from "./configs/env.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
