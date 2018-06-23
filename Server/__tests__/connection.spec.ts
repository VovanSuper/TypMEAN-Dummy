import { Connection, createConnection, getConnection } from 'typeorm';
import { ConnHandler } from '../helpers/handlers';

describe('Connection', () => {
  jest.setTimeout(1500);

  let conn: Connection;
  let connName = 'test-conn';

  beforeAll(async () => {
    if (conn && conn.name === connName && conn.isConnected)
      return await conn.close();
  });

  beforeEach(async () => {
    conn = await ConnHandler.getConn(connName);
  });

  afterEach(async () => {
    if (conn && conn.isConnected) return await ConnHandler.closeConn(connName);
  });

  it('should properly create a `test-conn` connection', () => {
    expect(conn).toBeTruthy();
    expect(conn.isConnected).toBe(true);
    expect(conn.name).toEqual(connName);
  });

  it('should be properly closed', async () => {
    ConnHandler.closeConn(connName);

    expect(conn.isConnected).toBe(false);
  });
});
