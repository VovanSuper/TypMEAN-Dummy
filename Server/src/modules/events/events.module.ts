import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import * as passport from 'passport';
import { EventsController } from './controllers/events.controller';
import { SharedModule } from '../shared/';

@Module({
  imports: [
    SharedModule
  ],
  components: [
    // AuthService,
    // UsersService,
    // EventsService
  ],
  controllers: [
    EventsController
  ]
})
export class EventsModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(EventsController);
  }
}