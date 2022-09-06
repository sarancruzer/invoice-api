import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./auth-strategy/jwt.strategy";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { Users } from "./entities/users.entity";
import { AUTH_SERVICE } from "./interface/auth.interface";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: {expiresIn:  '30m' }
    }),
    TypeOrmModule.forFeature([Users]),   
  ],
  providers: [
    { useClass: AuthService, provide: AUTH_SERVICE },
    AuthService,
    JwtStrategy, 
    ConfigService
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {
  
}
