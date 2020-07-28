import {createConnection, Connection} from "typeorm";

export class ConnectionService {
    private connection: Connection;

    async initConnection() {
        this.connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "test",
            password: "test",
            database: "test",
        });
    }

    getConnection(): Connection {
        return this.connection;
         }
}