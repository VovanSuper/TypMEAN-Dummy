import {
  ConnectionOptions,
  getConnectionManager,
  getConnection,
  createConnection,
  Connection,
} from 'typeorm';
import { Logger } from '@nestjs/common';
import { get } from 'config';
import { EventEntity, UserEntity } from '../data/entities';
import { providerTokens } from './tokens';

const getConn = async (name = 'default'): Promise<Connection> => {
  try {
    try {
      return Promise.resolve(getConnection(name));
    } catch (e) {
      return await createConnection(name);
    }
  } catch (e) {
    handleError(e);
    if (getConnectionManager().has(name))
      return Promise.resolve(getConnection(name));

    let ormConf = await _readOrmConf(null, name);
    return createConnection(ormConf);
  }
};

const closeConn = async (name = 'default') => {
  try {
    if (getConnectionManager().has(name) && getConnection(name).isConnected) {
      return await getConnection(name).close();
    } else {
      return Promise.resolve(void 0);
    }
  } catch (e) {
    return handleError(e);
  }
};

const ConnHandler = {
  getConn: getConn,
  closeConn: closeConn,
};

const handleError = (e: Error | string) => {
  Logger.warn('Error executing query');

  if (e instanceof Error) {
    Logger.error(`${e.name} ------- ${e.message}`);
    Logger.warn(e.stack);
  } else {
    Logger.error(e);
  }
};

const svcCtorLogger = (svc: Function) => {
  Logger.log(`${svc.name} ctor...`);
};

const applyShutDownListeners = app => {
  _EXIT_SIGNALS.forEach((sig: string) => _setTermListener(sig, app));
};

//#region auxiliary

async function _readOrmConf(
  path: string = null,
  name = 'default',
): Promise<ConnectionOptions> {
  try {
    try {
      return Promise.resolve(_makeTestConn(name));
      // return await getConnectionOptions(name)
    } catch (e) {
      try {
        // let rootPath = path ? path : resolve(process.cwd());
        // let ormConfName = 'ormconfig.json'
        // let conOptsReader = new ConnectionOptionsReader({
        //   root: rootPath,
        //   configName: ormConfName
        // });

        // return await conOptsReader.get(name);
        // let conf = require(resolve(rootPath, ormConfName));
        // let connStrObj = JSON.parse(conf);
        // return Promise.resolve(connStrObj);
        return Promise.resolve(_makeTestConn(name));
      } catch (e) {
        Logger.warn(
          `No ormConfig was read, using default opts:: ${e.message || e}`,
        );
        return Promise.resolve(_makeTestConn(name));
      }
    }
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
}

function _makeTestConn(
  name: string = <string>providerTokens.defaultConnectionToken,
): ConnectionOptions {
  Logger.log('[providers._makeTestConn]:: Creating connnection...');

  const opts: ConnectionOptions = {
    type: 'mongodb',
    name: name,
    host: get<string>('database.host'),
    port: get<number>('database.port'),
    username: get<string>('database.creds.username'),
    password: get<string>('database.creds.password'),
    database: get<string>('database.db'),
    logging: 'all',
    logger: 'advanced-console',
    entities: [EventEntity, UserEntity],
    entityPrefix: 'mpis__',
  };
  return opts;
}

const _EXIT_SIGNALS = ['SIGINT', 'SIGTERM'];

function _shutDown(app) {
  Logger.warn('\nExit signal received.\nShutting closing the app...');
  app.close();
  Logger.log('\nTerminating process in 200 ms...');
  setTimeout(() => process.exit(), 200);
}

function _setTermListener(sig: any | string, app) {
  process.on(sig, () => _shutDown(app));
}
//#endregion

export { handleError, svcCtorLogger, applyShutDownListeners, ConnHandler };
