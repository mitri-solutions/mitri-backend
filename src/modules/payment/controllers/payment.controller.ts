import { Controller, Post, Body } from "@nestjs/common";
import { CreatePaymentRequest } from "@modules/payment/types/payment.input";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("payment")
@Controller("/payment")
export class PaymentController {
  @Post()
  createPayment(@Body() input: CreatePaymentRequest): string {
    return "This action returns all cats";
  }
}
