import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { get } from 'config';

import { ApplicationModule } from './modules/app.module';
import {
  handleError,
  applyShutDownListeners,
  ConnHandler,
} from '../helpers/handlers';
import { providerTokens } from '../helpers/tokens';
// import { Container } from 'typedi';

let port = parseInt(process.env.API_PORT) || 8080;

// useContainer(Container, { fallback: true, fallbackOnErrors: true });
ConnHandler.getConn(<string>providerTokens.defaultConnectionToken)
  .then(async connection => {
    let app: Promise<INestApplication> = NestFactory.create(ApplicationModule, {
      bodyParser: true,
    });

    app.then(instance => {
      // instance.use(cors());
      // instance.setGlobalPrefix('/v1/api')
      // instance.use(passport.initialize({ userProperty: 'user' }));
      instance.enableCors();
      instance.listen(port, () =>
        console.log(`Application is listening on port ${port}`),
      );
      applyShutDownListeners(instance);
    });
  })
  .catch(e => handleError(e));
