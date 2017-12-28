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
        // passReqToCallback: true,
        secretOrKey: get<string>('secrets.jwtStr'),
      },
      async (payload, done) => await this.verifyJwt(payload, done)
    );
    passport.use(this);
  }

  async verifyJwt(payload, done) {
    const user = await this.authService.validateJwtUserByFbId(payload);
    if (!user) {
      return done('Unauthorized', null);
    }
    done(null, user);
  }
}