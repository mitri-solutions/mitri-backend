import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Min, IsNumber } from "class-validator";

export enum PaymentType {
  VNPAY = "VNPAY",
  VIETTEL_PAY = "VIETTEL_PAY",
  PAYPAL = "PAYPAL",
}

@Injectable()
export class CreatePaymentRequest {
  @ApiProperty({ enum: PaymentType })
  paymentType: PaymentType;

  @ApiProperty({ type: Number })
  @Min(0)
  @IsNumber()
  amount: number;

  @ApiProperty({ type: String })
  orderId: string;
}
