import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserInput } from "@modules/user/types/create-user.input";
import { UserService } from "@modules/user/services/user.service";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { User, UserDocument } from "@commons/entities";

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post("/create")
  @ApiCreatedResponse({
    description: "Json web token",
    type: User
  })
  create(@Body() input: CreateUserInput) {
    return this.userService.createUser(input);
  }
}
