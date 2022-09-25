import { Module } from "@nestjs/common";
import { UserModule } from "@modules/user/user.module";
import {
  default as config
} from "./configs/env.config";
import { ConfigModule } from "@nestjs/config";
import { PaymentModule } from "@modules/payment/payment.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    UserModule,
    PaymentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
