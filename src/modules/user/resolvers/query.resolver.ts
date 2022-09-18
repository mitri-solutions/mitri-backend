import { Args, Query, Resolver, ID } from "@nestjs/graphql";
import { User } from "../types/user.dto";
import { UserService } from "../services/user.service";

@Resolver(() => User)
export class UserQueryResolver {
  constructor(
    private readonly userService: UserService
  ) {}

  @Query(() => User, { nullable: true })
  async getUser(@Args("_id", { type: () => ID }) id: string) {
    const user = this.userService.createUser();
    return {
      username: "_username",
      password: "_password",
      name: "_name"
    };
  }
}
