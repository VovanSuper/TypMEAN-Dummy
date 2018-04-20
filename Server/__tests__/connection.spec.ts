import { getConn, closeConn } from "../helpers/";

describe('Connection', async () => {
  let conn;

  beforeAll(async () => {

    let connP = getConn('default');
    conn = await connP;
  });

  afterAll(async () => {
    await closeConn('default');
  })

  it('should properly create a default connection', async () => {

    expect(conn).toBeTruthy();
    expect(conn.isConnected).toBe(true);
    expect(conn.name).toEqual('default');
  });

  it('should be properly closed', async () => {
    await conn.close();
    expect(conn.isConnected).toBe(false);
  });

})