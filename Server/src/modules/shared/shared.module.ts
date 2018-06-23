import { Module } from '@nestjs/common';
import { FacebookStrategy, JwtStrategy } from './middlewares/passport/';
import {
  UserEntityService,
  AuthService,
  EventEntityService,
} from './services/';
import { RepositoriesProviderModule } from '../../../helpers/repos.provider.module';
import { AuthGuard } from './middlewares/passport/auth.guard';
import { DefaultConnectionProviderModule } from '../../../helpers/conn.providers.module';
import {
  UserEntityRepositoryProvider,
  EventEntityRepositoryProvider,
} from '../../../helpers/providers';
import { providerTokens } from '../../../helpers/tokens';

@Module({
  imports: [RepositoriesProviderModule],
  // imports: [
  //   DefaultConnectionProviderModule
  // ],
  providers: [
    UserEntityService,
    EventEntityService,
    AuthService,
    FacebookStrategy,
    JwtStrategy,
  ],
  exports: [
    UserEntityService,
    EventEntityService,
    AuthService,
    FacebookStrategy,
    JwtStrategy,
  ],
})
export class SharedModule {}
