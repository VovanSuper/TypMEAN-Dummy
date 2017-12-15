import { Module } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { EventsService } from './services/events.service';
import { EventsController} from './controllers/events.controller';

@Module({
  components: [
    MongoRepository,
    EventsService
  ],
  controllers: [
    EventsController
  ]
})
export class EventsModule { }