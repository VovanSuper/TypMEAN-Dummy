import * as passport from 'passport';
import { get } from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: get<string>('secrets.jwtStr'),
        //,  passReqToCallback: true
      },
      async (payload, done) => await this.verifyJwt(payload, done),
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
