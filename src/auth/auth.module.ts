import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "src/role/role.module";
import { JwtPayloadService } from "src/shared/services/jwt-payload.service";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "./auth-strategy/jwt.strategy";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AUTH_SERVICE } from "./interface/auth.interface";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: {expiresIn:  '30m' }
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    RoleModule
  ],
  providers: [
    { useClass: AuthService, provide: AUTH_SERVICE },
    AuthService,
    JwtStrategy, 
    ConfigService,
    JwtPayloadService
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {
  
}
