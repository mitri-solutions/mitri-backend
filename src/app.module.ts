import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UserModule } from "@modules/user/user.module";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import {
  default as config
} from "./configs/env.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
      installSubscriptionHandlers: true,
      cache: new InMemoryLRUCache({
        // ~512MiB
        maxSize: Math.pow(2, 20) * 512,
        // 5 minutes (in milliseconds)
        ttl: 300_000
      }),
      cors: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
