import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  createUser() {
    return "create user";
  }
}
