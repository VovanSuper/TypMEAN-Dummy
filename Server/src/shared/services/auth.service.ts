import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { UsersService } from './users.service';

@Component()
export class AuthService {

  constructor(private readonly userSvc: UsersService) { }

  async createToken() {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = { email: 'thisis@example.com' };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateJwtUser(payload: any): Promise<boolean> {
    let user = await this.userSvc.repo.findOneById(payload.id)
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  validateOrCreateFbUser(profile: any, accessToken): any {
    let user = this.userSvc.upsertFbUser(profile, accessToken);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}