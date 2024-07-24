import { Connection, createConnection } from "mysql2/promise";
import { databaseConfig } from "./config-database";

export class DatabaseAdapater {
  constructor() {}
  private async initializeConnection() {
    return await createConnection(databaseConfig);
  }
  async execute(query: string, params?: any[]): Promise<any> {
    const dbConnection = await this.initializeConnection();
    if (!dbConnection) throw new Error("Database not connected");
    const [queryResult] = await dbConnection.execute(query, params);
    await dbConnection.end();
    return queryResult;
  }
}
