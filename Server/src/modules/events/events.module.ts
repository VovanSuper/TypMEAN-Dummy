import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as passport from 'passport';
import { EventsController } from './controllers/events.controller';
import { SharedModule } from '../shared/';

@Module({
  imports: [SharedModule],
  controllers: [EventsController],
})
export class EventsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(EventsController);
  }
}
