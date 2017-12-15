import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './app/app.module';

import * as cors from 'cors';
import { Container } from 'typedi';
import { useContainer, createConnection, Connection, ConnectionOptions } from 'typeorm';
import { User, Event } from '../data/entities/';

let port = process.env.API_PORT;

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
    instance.use(cors());
    
    instance.listen(parseInt(port) || 8080, () => console.log(`Application is listening on port ${port}`))
  });

});