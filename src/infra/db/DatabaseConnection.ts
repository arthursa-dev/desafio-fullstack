export interface DatabaseConnection {
  query(statement: string, params: any): any;
}