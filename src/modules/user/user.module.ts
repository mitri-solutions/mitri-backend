import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "@modules/user/controllers/user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@commons/entities";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule {}
