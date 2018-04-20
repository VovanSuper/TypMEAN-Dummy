import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { ApplicationModule } from './modules/app.module';
import { get } from 'config';
// import { useContainer, createConnection, Connection, ConnectionOptions } from 'typeorm';
// import * as cors from 'cors';

import { getConn, handleError } from '../helpers/';
// import { json, urlencoded } from 'body-parser';
// import * as passport from 'passport';
// import { Container } from 'typedi';

let port = parseInt(process.env.API_PORT) || 8080;

// useContainer(Container, { fallback: true, fallbackOnErrors: true });
getConn('default').then(async connection => {
  const app: Promise<INestApplication> = NestFactory.create(ApplicationModule, {
    bodyParser: true
  });

  app.then(instance => {
    // instance.use(cors());
    // instance.use(passport.initialize({ userProperty: 'user' }));
    instance.enableCors();
    instance.listen(port, () => console.log(`Application is listening on port ${port}`));
  });

})
.catch(e => handleError(e))