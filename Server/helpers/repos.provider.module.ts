import { Module, NestModule } from '@nestjs/common';
import { NestFactory, ModuleRef } from '@nestjs/core';
import {
  EventEntityRepositoryProvider,
  UserEntityRepositoryProvider,
} from './providers';
import { DefaultConnectionProviderModule } from './conn.providers.module';

@Module({
  imports: [DefaultConnectionProviderModule],
  providers: [
    EventEntityRepositoryProvider('default'),
    UserEntityRepositoryProvider('default'),
  ],
  exports: [
    EventEntityRepositoryProvider('default'),
    UserEntityRepositoryProvider('default'),
  ],
})
export class RepositoriesProviderModule {}
