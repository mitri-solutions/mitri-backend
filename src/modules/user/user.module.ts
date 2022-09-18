import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserQueryResolver } from "./resolvers/query.resolver";

@Module({
  imports: [],
  controllers: [],
  providers: [
    UserQueryResolver,
    UserService
  ],
  exports: [UserService]
})

export class UserModule {
}
