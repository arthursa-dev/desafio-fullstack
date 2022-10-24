import { ProfessionalType } from "../../../domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../domain/repositories/ProfessionalTypeRepository";
import { DatabaseConnection } from "../../db/DatabaseConnection";

export class ProfessionalTypeDBRepository implements ProfessionalTypeRepository {
  private readonly databaseConnection: DatabaseConnection;
  
  constructor(databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection;
  }
  
  add(input: { description: string; situation: boolean; }): Promise<ProfessionalType> {
    throw new Error("Method not implemented.");
  }
  get(input: { id: string; }): Promise<ProfessionalType | undefined> {
    throw new Error("Method not implemented.");
  }
  update(input: { id: string; description?: string | undefined; situation?: boolean | undefined; }): Promise<ProfessionalType | undefined> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<ProfessionalType[]> {
    const result = await this.databaseConnection.query("select * from professional_type", []);
    return result.map((professionalTypeData: any) => new ProfessionalType({
      id: professionalTypeData.id,
      description: professionalTypeData.description,
      situation: professionalTypeData.situation,
      createdAt: professionalTypeData.created_at,
      updatedAt: professionalTypeData.updated_at,
    }));
  }

}