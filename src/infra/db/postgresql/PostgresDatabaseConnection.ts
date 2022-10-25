import pgp from 'pg-promise';
import { DatabaseConnection } from "../DatabaseConnection";

export class PostgresDatabaseConnection implements DatabaseConnection {
  private readonly pgp;
  
  constructor() {
    this.pgp = pgp()(process.env.DB_URL_CONN as string);
  }
  
  query(statement: string, params: any) {
    return this.pgp.query(statement, params);
  }
}
