import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;
}
