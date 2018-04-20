import { Module } from '@nestjs/common';
import { EventEntityRepositoryProvider, UserEntityRepositoryProvider } from "./providers";
import { ConnectionProviderModule } from './conn.provider.module';

@Module({
  imports: [
    ConnectionProviderModule
  ],
  components: [
    EventEntityRepositoryProvider,
    UserEntityRepositoryProvider
  ],
  exports: [
    EventEntityRepositoryProvider,
    UserEntityRepositoryProvider
  ]

})
export class RepositoriesProviderModule { }