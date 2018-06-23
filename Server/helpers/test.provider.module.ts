import { Module } from '@nestjs/common';
import { RepositoriesProviderModule } from './repos.provider.module';
import { testProviders } from './providers';
import {
  EventEntityService,
  UserEntityService,
} from '../src/modules/shared/services';

@Module({
  imports: [RepositoriesProviderModule],
  providers: [...testProviders],
  exports: [...testProviders],
})
export class TestProvidersModule {}
