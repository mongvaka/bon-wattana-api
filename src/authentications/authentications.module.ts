import { Module } from "@nestjs/common";
import { AuthenticationsService } from "./authentications.service";
import { AuthenticationsController } from "./authentications.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "users",
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  providers: [AuthenticationsService, JwtStrategy],
  controllers: [AuthenticationsController],
  exports: [AuthenticationsService, JwtStrategy],
})
export class AuthenticationsModule {}
