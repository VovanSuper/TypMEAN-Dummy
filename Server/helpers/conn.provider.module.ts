import { Module, Global } from '@nestjs/common';
import { defaultConnectionProvider } from "./providers";

@Global()
@Module({
  components: [
    defaultConnectionProvider
  ],
  exports: [
    defaultConnectionProvider
  ]

})
export class ConnectionProviderModule { }