import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import * as passport from 'passport';

import { UsersController } from './controllers/users.controller';
import { SharedModule } from '../shared/shared.module';
import { loggerMiddleware } from '../shared/middlewares/';

@Module({
  imports: [
    SharedModule
  ],
  // components: [
  //   MongoRepository,
  //   UsersService,
  //   AuthService
  // ],
  controllers: [
    UsersController
  ]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(loggerMiddleware).forRoutes(UsersController);

    consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(
      { path: '/users/:id', method: RequestMethod.GET },
      { path: '/users/:fb_id', method: RequestMethod.PATCH },
      { path: '/users', method: RequestMethod.GET },
      { path: '/users', method: RequestMethod.POST }
    );
  }

}