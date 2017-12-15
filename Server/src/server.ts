import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './app.module';

import * as cors from 'cors';
import * as passport from 'passport';
import { Container } from 'typedi';
import { useContainer, createConnection, Connection, ConnectionOptions } from 'typeorm';
import { User, Event } from '../data/entities/';

let port = parseInt(process.env.API_PORT) || 8080;

const opts: ConnectionOptions = {
  type: 'mongodb',
  host: 'ds042687.mlab.com',
  port: 42687,
  username: 'test',
  password: 'test',
  database: 'mpis',
  synchronize: true,
  logging: true,
  logger: 'debug',
  name: 'default',
  entities: [Event, User]
}

// useContainer(Container, { fallback: true, fallbackOnErrors: true });
createConnection(opts).then(async (connection: Connection) => {
  const app: Promise<INestApplication> = NestFactory.create(ApplicationModule);

  app.then(instance => {
    instance.use(passport.initialize());
    instance.use(cors());

    instance.listen(port, () => console.log(`Application is listening on port ${port}`))
  });

});