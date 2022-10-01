import { ApiProperty } from "@nestjs/swagger";
import { Provider, SessionStatus } from "@commons/types/enum";
import { Types } from "mongoose";

export class CreateSessionInput {
  @ApiProperty({ type: String })
  userId: Types.ObjectId;

  @ApiProperty({ type: String })
  deviceName?: string;

  @ApiProperty({ enum: Provider })
  provider?: Provider;

  @ApiProperty({ enum: SessionStatus })
  status?: SessionStatus;

  @ApiProperty({ type: Date })
  expiredAt?: Date;
}
