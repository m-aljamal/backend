import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',

      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const user = this.authService.validate(req.body);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
