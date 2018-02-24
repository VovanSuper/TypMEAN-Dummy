import { Component, Inject, forwardRef,  } from '@nestjs/common';
import { MongoRepository, getMongoRepository, MongoError } from 'typeorm';
import { Profile } from 'passport-facebook-token';
// import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../../../data/entities';
import { UserDto } from '../../../models/user.dto';
import { EventsService } from './events.service';
import { Event } from '@angular/router/src/events';

@Component()
export class UsersService {
  public usersRepo: MongoRepository<User>;

  constructor(@Inject(forwardRef(() => EventsService)) private readonly eventsSvc: EventsService) {
    this.usersRepo = getMongoRepository(User);
    console.log('UsersService ctor..... ');
  }

  async upsertFbUser(profile: Profile, accessToken: string): Promise<User> {
    try {
      let existingUser = await this.usersRepo.findOne({ 'fb_id': profile.id });
      if (!existingUser) {
        let savedUser = await this.usersRepo.save({
          name: profile.displayName,
          email: profile.emails[0].value || null,
          avatarUrl: profile.photos[0].value || null,
          fb_id: profile.id,
          username: profile.username,
          fb_token: accessToken
        });
        if (savedUser) {
          return savedUser as User;
        } else {
          return null;
        }
      }
      else {
        return existingUser;
      }
    } catch (e) {
      return this.handleError(e);
    }
  }

  async all(): Promise<User[]> {
    try {
      return await this.usersRepo.find();
    } catch (e) {
      return this.handleError(e);
    }
  }

  async oneById(id: string | number): Promise<User> {
    try {
      return await this.usersRepo.findOneById(id);
    } catch (e) {
      return this.handleError(e);
    }
  }

  async oneByFbId(fb_id: string): Promise<User> {
    try {
      return await this.usersRepo.findOne({ fb_id: fb_id });
    } catch (e) {
      return this.handleError(e)
    }
  }

  async create(user: Partial<User>): Promise<User> {
    try {
      let newUser = await this.usersRepo.save(user);
      if (!newUser || newUser === undefined)
        throw new Error('Error persisting user...');

      return newUser as User;
    } catch (e) {
      return this.handleError(e);
    }
  }

  async updateOneByFbId(fbId: string, user: Partial<User>): Promise<User> {
    try {
      let existingUser = await this.usersRepo.findOne({ fb_id: fbId });
      if (!existingUser)
        throw new Error(`No user with fb_id of ${fbId} found, Must register with FB first...`);

      let updated = await this.usersRepo.findOneAndUpdate({ id: existingUser.id }, user, { upsert: false });
      if (!updated || updated === undefined)
        throw new Error(`Error updating the user`);

      return await this.usersRepo.findOne(updated as Partial<User>);

    } catch (e) {
      return this.handleError(e);
    }
  }

  async updateOneById(id: string) {
    try {

    }catch (e) {
      return this.handleError(e);
    }
  }

  async oneByFbIdAddEvent(eventId: string, predicate: Function) {
    (await this.eventsSvc.all()).filter()
  }

  async deleteById(id: string): Promise<void> {
    try {
      let deletion = this.usersRepo.deleteById(id);
      deletion.then(_ => {
        this.eventsSvc.all
      })
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(e: MongoError) {
    console.log('Error executing query\n');
    console.log(`${e.name} -- ${e.message}`);
    console.log(`${e.stack || e}`);
    return Promise.reject(e);
  }
}
