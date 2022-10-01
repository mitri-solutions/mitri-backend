import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { User, UserDocument } from "@commons/entities";
import { CreateUserInput } from "../types/create-user.input";
import { hashPassword } from "@commons/utils/password";
import { UserInputError, ErrorCodes } from "@commons/errors";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {
  }

  async validateUser(input: {
    username?: string;
    email?: string
    phoneNumber?: string;
  }) {
    const existUser = await this.userModel.findOne({
      $or: [
        {
          username: input.username
        },
        {
          email: input.email
        },
        {
          phoneNumber: input.phoneNumber
        }
      ]
    });

    return !existUser;
  }

  async createUser(input: CreateUserInput) {
    const isValidUser = await this.validateUser(input);
    if (!isValidUser) {
      throw new UserInputError(ErrorCodes.USER_EXISTS);
    }

    const result = await this.userModel.create({
      ...input,
      password: hashPassword(input.password)
    });
    delete result.password;
    return result;
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({
      username,
      deletedAt: null
    }).lean();
  }
}
