import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import env from "@configs/env.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env().API_PORT);
}

bootstrap();
