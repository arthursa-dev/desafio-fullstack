import pgp from 'pg-promise';
import { DatabaseConnection } from "../DatabaseConnection";

export class PostgresDatabaseConnection implements DatabaseConnection {
  private readonly pgp;
  
  constructor() {
    this.pgp = pgp()('postgres://postgres:123456@localhost:5432/postgres');
  }
  
  query(statement: string, params: any) {
    return this.pgp.query(statement, params);
  }
}
