import { createConnection, Connection } from 'typeorm';

export default class ConnectionService {
  private connection: Connection;

  async initConnection(): Promise<void> {
    this.connection = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
    });
  }

  async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }
    await this.initConnection();
    return this.connection;
  }
}
