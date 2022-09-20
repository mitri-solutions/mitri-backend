import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import env from "@configs/env.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = env().API_PORT;
  await app.listen(PORT);
  console.log(`App is running in: https://localhost:${PORT}`);
}

bootstrap();
