import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { Profile } from 'passport-facebook-token';
// import { OrmRepository } from 'typeorm-typedi-extensions';

import { UserEntity, EventEntity } from '../../../../data/entities/';
import { handleError, svcCtorLogger } from '../../../../helpers/';
import { providerTokens } from '../../../../helpers/tokens';

import { UserDto, User, UserBase, UserBaseDto, FbUser } from '../../../models/';

@Injectable()
export class UserEntityService implements OnModuleInit {
  // usersRepo: MongoRepository<UserEntity>;
  // eventsRepo: MongoRepository<EventEntity>;
  constructor(
    @Inject(providerTokens.UserEntityRepositoryToken)
    private readonly usersRepo: MongoRepository<UserEntity>,
    @Inject(providerTokens.EventEntityRepositoryToken)
    private readonly EventEntityRepo: MongoRepository<EventEntity>,
  ) {
    // this.usersRepo = getMongoRepository<UserEntity>(UserEntity);
    // this.eventsRepo = getMongoRepository<EventEntity>(EventEntity);
  }
  async onModuleInit() {
    svcCtorLogger(UserEntityService);
  }

  async all(): Promise<UserBaseDto[] | void> {
    try {
      let users = await this.usersRepo.find();
      return users.map(user => UserBaseDto.fromEntity(user));
    } catch (e) {
      handleError(e);
    }
  }

  async upsertFbUser(
    profile: Profile,
    accessToken: string,
  ): Promise<UserDto | void> {
    try {
      let existingUser = await this.usersRepo.findOne({ fb_id: profile.id });
      if (!existingUser) {
        let savedUser = await this.usersRepo.save({
          email: profile.emails[0].value || null,
          avatarUrl: profile.photos[0].value || null,
          fb_id: profile.id,
          username: profile.username,
          name: profile.displayName,
          fb_token: accessToken,
          registered: new Date(),
        });
        if (savedUser) {
          return UserDto.fromEntity(savedUser);
        } else {
          return null;
        }
      } else {
        return UserDto.fromEntity(existingUser);
      }
    } catch (e) {
      handleError(e);
    }
  }

  async oneById(id: string): Promise<UserDto | void> {
    try {
      let user = await this.usersRepo.findOne(id);
      return UserDto.fromEntity(user);
    } catch (e) {
      handleError(e);
    }
  }

  async oneByFbId(fbId: string): Promise<UserDto | void> {
    try {
      let fbUser = await this.usersRepo.findOne({ fb_id: fbId });
      return UserDto.fromEntity(fbUser);
    } catch (e) {
      handleError(e);
    }
  }

  async create(user: UserBaseDto): Promise<UserBaseDto | void> {
    try {
      let newUser = await this.usersRepo.save(user);
      if (!newUser || newUser === undefined)
        throw new Error('Error persisting user...');

      return UserDto.fromEntity(newUser);
    } catch (e) {
      handleError(e);
    }
  }

  async updateOneByFbId(fbId: string, user: UserBaseDto): Promise<UserDto> {
    try {
      // let existingUser = await this.usersRepo.findOne({ fb_id: fbId });
      // if (!existingUser)
      //   throw new Error(`No user with fb_id of ${fbId} found, Must register with FB first...`);

      // let updated = await this.usersRepo.findOneAndUpdate({ id: existingUser.id }, user, { upsert: false });
      let updated = await this.usersRepo.findOneAndUpdate(
        { fb_id: fbId },
        user,
        { upsert: false },
      );
      if (!updated || updated.ok !== 1)
        throw new Error(`Error updating the user`);

      return await UserDto.fromEntity(updated.value);
    } catch (e) {
      handleError(e);
    }
  }

  async updateOneById(id: string, user: UserBaseDto): Promise<UserDto> {
    try {
      let updated = await this.usersRepo.findOneAndUpdate({ id: id }, user, {
        upsert: false,
      });
      if (!updated || updated.ok !== 1)
        throw new Error(`Error updating the user`);

      return await UserDto.fromEntity(updated.value);
    } catch (e) {
      handleError(e);
    }
  }

  async oneByFbIdAddEvent(eventId: string, predicate: Function) {
    //TODO
    // (await this.eventsSvc.all()).filter()
  }

  async deleteById(id: string): Promise<void> {
    try {
      let deletion = await this.usersRepo.delete(id);
    } catch (e) {
      handleError(e);
    }
  }
}
