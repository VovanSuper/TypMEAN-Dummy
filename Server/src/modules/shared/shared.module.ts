import { Module } from '@nestjs/common';
import { FacebookStrategy, JwtStrategy } from "./middlewares/passport/";
import { UserEntityService, AuthService, EventEntityService } from './services/';
import { RepositoriesProviderModule } from '../../../helpers/repos.provider.module';

@Module({
  imports: [
    RepositoriesProviderModule
  ],
  components: [
    FacebookStrategy,
    JwtStrategy,
    UserEntityService,
    EventEntityService,
    AuthService
  ],
  exports: [
    FacebookStrategy,
    JwtStrategy,
    UserEntityService,
    EventEntityService,
    AuthService
  ]
  ,
})
export class SharedModule { }