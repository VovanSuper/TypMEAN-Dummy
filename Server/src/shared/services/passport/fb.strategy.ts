import * as passport from 'passport';
import { Strategy, } from 'passport-facebook';
import { Component } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class FacebookStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: '1825033960857449',
        clientSecret: '7407f9034980d256f2ab85162925ab77',
        profileFields: ['email', 'public_profile'],
        callbackURL: 'localhost:8080/auth/facebook/callback'
      },
      async (accessToken, refreshToken, profile, done) =>
        await this.verifyFb(accessToken, refreshToken, profile, done)
    );
    passport.use(this);
  }

  public async verifyFb(accessToken, refreshToken, profile: passport.Profile, done) {
    console.log(`[fb.strategy->verifyFb()]:: accessToken: ${accessToken}, profile: ${JSON.stringify(profile)}`);
    const isValid = await this.authService.validateOrCreateFbUser(profile, accessToken);
    if (!isValid) {
      return done('Unauthorized', null);
    }
    return done(null, profile);
  }
}