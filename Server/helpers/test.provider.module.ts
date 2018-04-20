import { Module } from "@nestjs/common";
import { RepositoriesProviderModule } from "./repos.provider.module";
import { testProviders } from "./providers";

@Module({
  imports: [
    RepositoriesProviderModule
  ],
  components: [
    ...testProviders
  ],
  exports: [
    ...testProviders
  ]
})
export class TestProvidersModule { }
