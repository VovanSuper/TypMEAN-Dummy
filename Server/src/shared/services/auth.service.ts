import { Component } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { get } from "config";
import { Profile } from 'passport-facebook-token';
import { UsersService } from './users.service';
import { fbUserDto } from '../../models/index';

@Component()
export class AuthService {

  constructor(private readonly userSvc: UsersService) { }

  createToken(fb_id: number | string, name?: string, email?: string | null) {
    const expiresIn = 60 * 60 * 24 * 60,
      secretOrKey = get<string>('secrets.jwtStr');
    let user = { fb_id, name, email };
    return jwt.sign(user, secretOrKey, { expiresIn });

  }

  async validateJwtUser(payload: fbUserDto): Promise<number | string | null> {
    let user = await this.userSvc.repo.findOne({ fb_id: payload.fb_id })
    if (user) {
      return user.fb_id;
    } else {
      console.log(`[auth.service->validateJwtUser()]:: user is ${JSON.stringify(user)}`);

      return null;
    }
  }

  async validateOrCreateFbUser(profile: Profile, accessToken: string): Promise<fbUserDto> {
    try {
      let fbUser = await this.userSvc.upsertFbUser(profile, accessToken);
      if (fbUser) {
        return fbUser;
      } else {
        console.log(`[auth.service->validateOrCreateFbUser()]:: user is ${JSON.stringify(fbUser)}`);
        return null;
      }
    } catch (e) {
      console.log(`[auth.svc->validateORCreateFbUser()]:: ${JSON.stringify(e)}`);
    }
  }
}