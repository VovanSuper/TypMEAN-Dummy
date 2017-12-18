import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import * as passport from 'passport';
import { SharedModule } from '../shared/shared.module';
// import { UsersService, AuthService } from '../shared/services/'
import { loggerMiddleware } from '../shared/middlewares/';
import { AuthController } from './controllers/';
import { AddTokenMiddleware } from "./middlewares/";

@Module({
  modules: [
    SharedModule
  ],
  components: [
    AddTokenMiddleware
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(loggerMiddleware).forRoutes(AuthController);

    consumer.apply([
      passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
      AddTokenMiddleware])
      .forRoutes(AuthController);
  }

}