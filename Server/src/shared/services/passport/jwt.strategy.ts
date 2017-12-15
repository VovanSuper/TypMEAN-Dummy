import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secret',
      },
      async (req, payload, next) => await this.verifyJwt(req, payload, next)
    );
    passport.use(this);
  }

  public async verifyJwt(req, payload, done) {
    const isValid = await this.authService.validateJwtUser(payload);
    if (!isValid) {
      return done('Unauthorized', null);
    }
    done(null, payload);
  }
}