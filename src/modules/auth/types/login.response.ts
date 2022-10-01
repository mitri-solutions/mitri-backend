import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({ type: String })
  accessToken: string;

  @ApiProperty({ type: String })
  refreshToken: string;

  @ApiProperty({ type: Date })
  expiredAt: Date;
}
