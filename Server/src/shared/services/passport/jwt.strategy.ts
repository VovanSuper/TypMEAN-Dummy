import * as passport from 'passport';
import { get } from 'config';
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
        secretOrKey: get<string>('secrets.jwtStr'),
      },
      async (req, payload, next) => await this.verifyJwt(req, payload, next)
    );
    passport.use(this);
  }

  async verifyJwt(req, payload, done) {
    const isValid = await this.authService.validateJwtUser(payload);
    if (!isValid) {
      return done('Unauthorized', null);
    }
    done(null, payload);
  }
}