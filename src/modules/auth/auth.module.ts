import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@commons/entities";
import { AuthController } from "@modules/auth/controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { envConfig } from "@configs/env.config";
import { UserModule } from "@modules/user/user.module";
import { SessionModule } from "@modules/sessions/session.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: envConfig.JWT_SECRET
    }),
    forwardRef(() => UserModule),
    forwardRef(() => SessionModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule {
}
