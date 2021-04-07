import {Module} from '@nestjs/common';
import {NoCspController} from './1-no-csp/no-csp.controller';
import {SelfCspController} from './2-self-csp/self-csp.controller';
import {LocalScriptController} from './local-script.controller';
import {NonceController} from './3-nonce/nonce.controller';
import {HashController} from './4-hash/hash.controller';


@Module({
  imports: [],
  controllers: [
    NoCspController,
    SelfCspController,
    LocalScriptController,
    NonceController,
    HashController
  ],
  providers: [],
})
export class AppModule {
}
