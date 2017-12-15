import { Module } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { EventsService, UsersService } from './services/';
import { EventsController, UsersController } from './controllers/';

@Module({
  components: [
    MongoRepository,
    EventsService,
    UsersService
  ],
  controllers: [
    EventsController,
    UsersController
  ]
})
export class ApplicationModule { }