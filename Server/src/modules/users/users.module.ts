import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import * as passport from 'passport';

import { UsersController } from './controllers/users.controller';
import { SharedModule } from '../shared/shared.module';
import { loggerMiddleware } from '../shared/middlewares/';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(loggerMiddleware).forRoutes(UsersController);

    // return consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(UsersController);
  }
}
