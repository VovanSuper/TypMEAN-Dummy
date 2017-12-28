import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import * as passport from 'passport';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { SharedModule } from '../shared/';
import { AuthService } from '../shared/services/auth.service';
import { UsersService } from '../shared/services/users.service';

@Module({
  modules: [
    SharedModule
  ],
  components: [
    AuthService,
    UsersService,
    EventsService
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