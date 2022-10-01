import { Module } from "@nestjs/common";
import { UserModule } from "@modules/user/user.module";
import { PaymentModule } from "@modules/payment/payment.module";
import { CoreModule } from "@commons/modules/core.module";
import { AuthModule } from "@modules/auth/auth.module";
import { SessionModule } from "@modules/sessions/session.module";

@Module({
  imports: [
    CoreModule,
    UserModule,
    PaymentModule,
    AuthModule,
    SessionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
