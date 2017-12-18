import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import { get } from 'config';
import { Container } from 'typedi';
import { useContainer, createConnection, Connection, ConnectionOptions } from 'typeorm';
import { User, Event } from '../data/entities/';

let port = parseInt(process.env.API_PORT) || 8080;

const opts: ConnectionOptions = {
  type: 'mongodb',
  host: get<string>('database.host'),
  port: get<number>('database.port'),
  username: get<string>('database.creds.username'),
  password: get<string>('database.creds.password'),
  database: get<string>('database.db'),
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
    instance.use(cors());
    // instance.use(json());
    // instance.use(urlencoded({ extended: false }));
    // instance.use(passport.initialize({ userProperty: 'user' }));

    instance.listen(port, () => console.log(`Application is listening on port ${port}`))
  });

});