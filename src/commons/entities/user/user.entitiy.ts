import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongoSchema } from "mongoose";
import { BaseEntity } from "@commons/entities/base.entities";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

export enum UserStatus {
  Disabled = "DISABLED",
  Active = "ACTIVE",
}

@Schema({
  timestamps: true
})
export class User extends BaseEntity {
  @Prop()
  @ApiProperty({ type: String })
  username: string;

  @Prop()
  @ApiProperty({ type: String })
  email?: string;

  @Prop()
  @ApiProperty({ type: String })
  phoneNumber?: string;

  @Prop()
  password!: string;

  @Prop()
  @ApiProperty({ type: String })
  fullName?: string;

  @Prop()
  @ApiProperty({ type: String })
  roles: string[];

  @Prop({
    type: MongoSchema.Types.String,
    enum: UserStatus,
    default: UserStatus.Active
  })
  @ApiProperty({ type: String })
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  email: 1
});
