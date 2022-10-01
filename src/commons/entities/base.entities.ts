import { Prop } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type BaseDocument = BaseEntity & Document;

export class BaseEntity {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  createById?: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  updateById?: Types.ObjectId;

  @ApiProperty({ type: Date })
  @Prop({
    type: SchemaTypes.Date,
    default: null,
  })
  deletedAt?: Date;
}
