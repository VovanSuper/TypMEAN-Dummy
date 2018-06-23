import { Module, Global } from '@nestjs/common';
import { ConnectionProvider } from './providers';
import { providerTokens } from './tokens';

// @Global()
@Module({
  providers: [
    ConnectionProvider(<string>providerTokens.defaultConnectionToken),
  ],
  exports: [ConnectionProvider(<string>providerTokens.defaultConnectionToken)],
})
class DefaultConnectionProviderModule {}

// @Global()
@Module({
  providers: [ConnectionProvider(<string>providerTokens.testConnectionToken)],
  exports: [ConnectionProvider(<string>providerTokens.testConnectionToken)],
})
class TestConnectionProviderModule {}

export { DefaultConnectionProviderModule, TestConnectionProviderModule };
