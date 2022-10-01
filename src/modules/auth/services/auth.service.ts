import { Injectable } from "@nestjs/common";
import { UserService } from "@modules/user/services/user.service";
import { LoginInput } from "@modules/auth/types/login.input";
import { comparePassword } from "@commons/utils/password";
import { ErrorCodes, UserInputError } from "@commons/errors";
import { User } from "@commons/entities";
import { LoginResponse } from "@modules/auth/types/login.response";
import { JwtService } from "@nestjs/jwt";
import * as moment from "moment";
import { SessionService } from "@modules/sessions/services/session.service";
import { Provider, SessionStatus } from "@commons/types/enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService
  ) {
  }

  async createJWT(user: User, provider: Provider) {
    // Create new sessions
    const session = await this.sessionService.createSession({
      userId: user._id,
      deviceName: "Unknown",
      provider,
      status: SessionStatus.LIVE
    });

    const jwtBody = {
      _id: user._id,
      username: user.username,
      sessionId: session._id
    };
    const accessToken = this.jwtService.sign(jwtBody, {
      expiresIn: "1d"
    });
    const refreshToken = this.jwtService.sign(jwtBody, {
      expiresIn: "30d"
    });
    const expiredAt = moment().add(1, "day").toDate();

    return {
      accessToken,
      refreshToken,
      expiredAt
    };
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    const { username, password } = input;
    const user = await this.userService.findByUsername(username);
    if (!user || !comparePassword(password, user.password)) {
      throw new UserInputError(ErrorCodes.WRONG_PASSWORD);
    }

    return this.createJWT(user, Provider.Local);
  }
}
