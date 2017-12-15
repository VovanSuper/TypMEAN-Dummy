import { Component, Inject } from '@nestjs/common';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { Profile } from "passport-facebook";
// import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../../data/entities';
import { UserDto } from '../../models/user.dto';

@Component()
export class UsersService {
  public repo: MongoRepository<User>;

  constructor() {
    this.repo = getMongoRepository(User);
    console.log('UsersService ctor..... ');
  }

  async upsertFbUser(accessToken, profile: Profile) {
    let existingUser = await this.repo.findOneById(profile.id);
    try {
      if (!existingUser) {
        let savedUser = await this.repo.save({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatarUrl: profile.profileUrl,
          fb_id: profile.id,
          fb_token: accessToken
        });
        if (savedUser) {
          return savedUser;
        } else {
          return null;
        }
      }
      else {
        return existingUser;
      }
    } catch (e) {
      console.log('[user.svc->upsertFbUser()')
      console.dir(e)
      return null;
    }
  }
}
