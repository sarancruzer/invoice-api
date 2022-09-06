import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      }
    );
  }

  async validate(username: string, password: string): Promise<any> {
  console.log('LocalStrategy -> classLocalStrategyextendsPassportStrategy -> validate');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }
  
}