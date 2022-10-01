import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Session, SessionDocument } from "@commons/entities/sessions";
import { CreateSessionInput } from "@modules/sessions/types/create-session.input";

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private sessionModel: Model<SessionDocument>
  ) {
  }

  createSession(input: CreateSessionInput) {
    return this.sessionModel.create({ ...input });
  }
}
