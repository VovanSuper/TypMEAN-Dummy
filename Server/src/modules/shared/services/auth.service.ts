import { Component, Inject } from '@nestjs/common';
import { get } from "config";
import { Profile } from 'passport-facebook-token';
import { UserEntityService } from './users.service';
import { FbUserDto, UserDto } from '../../../models/';
import { handleError } from '../../../../helpers/';

@Component()
export class AuthService {

  constructor(private readonly userSvc: UserEntityService) {
    console.log('AuthService ctor..... ');
   }

  async validateJwtUserByFbId(payload: FbUserDto): Promise<UserDto | null> {
    let user = await this.userSvc.oneByFbId(payload.fb_id);
    if (user) {
      return user;
    } else {
      console.log(`[auth.service->validateJwtUser()]:: user is ${JSON.stringify(user)}`);

      return null;
    }
  }

  async validateOrCreateFbUser(profile: Profile, accessToken: string): Promise<UserDto | void> {
    try {
      let fbUser = await this.userSvc.upsertFbUser(profile, accessToken);
      if (fbUser) {
        return fbUser;
      } else {
        console.log(`[auth.service->validateOrCreateFbUser()]:: user is ${JSON.stringify(fbUser)}`);
        return null;
      }
    } catch (e) {
      handleError(e);
    }
  }
}