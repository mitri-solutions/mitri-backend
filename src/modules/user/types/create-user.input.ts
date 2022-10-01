import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsEmail } from "class-validator";

@Injectable()
export class CreateUserInput {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email?: string;

  @ApiProperty({ type: String })
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({ type: String })
  password!: string;

  @ApiProperty({ type: String })
  fullName?: string;
}
