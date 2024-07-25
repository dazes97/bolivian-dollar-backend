import {
  createPool,
  PoolOptions,
  Pool,
  QueryResult,
  FieldPacket,
} from "mysql2/promise";
import { databaseConfig } from "./config-database";
export class DatabaseAdapater {
  private conn: Pool;
  private credentials: PoolOptions;
  constructor() {
    this.initializeConnection();
  }
  private async initializeConnection() {
    this.credentials = databaseConfig();
    this.conn = createPool(this.credentials);
  }
  private ensureConnection() {
    if (!this?.conn) this.conn = createPool(this.credentials);
  }
  async execute(
    query: string,
    params?: any[]
  ): Promise<[QueryResult, FieldPacket[]]> {
    this.ensureConnection();
    return await this.conn.execute(query, params);
  }
  async executeStoredProcedure(
    query: string,
    params?: any[]
  ): Promise<[QueryResult, FieldPacket[]]> {
    this.ensureConnection();
    return await this.conn.execute(query, params);
  }
}
