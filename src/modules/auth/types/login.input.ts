import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class LoginInput {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password!: string;
}
