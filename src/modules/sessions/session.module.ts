import { Module } from "@nestjs/common";
import { SessionService } from "./services/session.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Session, SessionSchema } from "@commons/entities/sessions";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])
  ],
  controllers: [],
  providers: [SessionService],
  exports: [SessionService]
})

export class SessionModule {
}
