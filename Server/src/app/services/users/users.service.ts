import { Component } from '@nestjs/common';
// import { UserRepository } from '../../../../data/repositories/';
import { Inject, Container, Service } from 'typedi';
import { MongoRepository, getMongoRepository } from 'typeorm';

import { User } from '../../../../data/entities';

@Component()
export class UsersService {
  public repo: MongoRepository<User>;
  // constructor(@Inject() public repo: UserRepository) {
  // this.repo = Container.get(UserRepository);
  constructor() {
    this.repo = getMongoRepository(User);
  }

}



