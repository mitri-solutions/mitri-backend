import { Module } from "@nestjs/common";
import { PaymentController } from "@modules/payment/controllers/payment.controller";
import { VnpayPaymentService } from "@modules/payment/services/vnpay.payment.service";

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [VnpayPaymentService],
  exports: [VnpayPaymentService]
})

export class PaymentModule {
}
