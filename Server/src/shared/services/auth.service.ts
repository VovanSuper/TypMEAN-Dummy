import { Component } from '@nestjs/common';
import { get } from "config";
import { Profile } from 'passport-facebook-token';
import { UsersService } from './users.service';
import { FbUserDto, UserDto } from '../../models/';

@Component()
export class AuthService {

  constructor(private readonly userSvc: UsersService) { }

  async validateJwtUserByFbId(payload: FbUserDto): Promise<UserDto | null> {
    let user = await this.userSvc.repo.findOne({ fb_id: payload.fb_id })
    if (user) {
      return user;
    } else {
      console.log(`[auth.service->validateJwtUser()]:: user is ${JSON.stringify(user)}`);

      return null;
    }
  }

  async validateOrCreateFbUser(profile: Profile, accessToken: string): Promise<UserDto> {
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