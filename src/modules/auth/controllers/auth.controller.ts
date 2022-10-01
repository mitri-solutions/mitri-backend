import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { LoginInput } from "@modules/auth/types/login.input";
import { AuthService } from "@modules/auth/services/auth.service";
import { LoginResponse } from "@modules/auth/types/login.response";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("/login")
  @ApiCreatedResponse({
    description: "Json web token",
    type: LoginResponse
  })
  login(@Body() input: LoginInput): Promise<LoginResponse> {
    return this.authService.login(input);
  }
}
