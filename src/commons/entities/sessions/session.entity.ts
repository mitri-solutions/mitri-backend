import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongoSchema, Types } from "mongoose";
import { BaseEntity } from "@commons/entities/base.entities";
import { ApiProperty } from "@nestjs/swagger";
import { Provider, SessionStatus } from "@commons/types/enum";

export type SessionDocument = Session & Document;

@Schema({
  timestamps: true
})
export class Session extends BaseEntity {
  @Prop()
  @ApiProperty({ type: String })
  userId: Types.ObjectId;

  @Prop()
  @ApiProperty({ type: String })
  deviceName?: string;

  @Prop()
  @ApiProperty({ enum: Provider })
  provider?: Provider;

  @Prop()
  @ApiProperty({ enum: SessionStatus })
  status?: SessionStatus;

  @Prop()
  @ApiProperty({ type: Date })
  expiredAt?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
