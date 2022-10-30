import { ProfessionalType } from "../../../domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../domain/repositories/ProfessionalTypeRepository";
import { AppError } from "../../../shared/AppError";
import { DatabaseConnection } from "../../db/DatabaseConnection";

export class ProfessionalTypeDBRepository implements ProfessionalTypeRepository {
  private readonly databaseConnection: DatabaseConnection;
  
  constructor(databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection;
  }
  
  async add({ description, situation }: { description: string; situation: boolean; }): Promise<ProfessionalType> {
    const [result] = await this.databaseConnection.query(
      "insert into professional_type (description, situation) values ($1, $2) returning *", [description, situation]);
    return new ProfessionalType({
      id: result.id,
      description: result.description,
      situation: result.situation,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  }

  async get({ id }: { id: string; }): Promise<ProfessionalType | undefined> {
    const [result] = await this.databaseConnection.query("select * from professional_type where id = $1", [id]);
    if (!result) throw new AppError('Professional type not found', 404);
    return new ProfessionalType({
      id: result.id,
      description: result.description,
      situation: result.situation,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  }

  async update({
    id,
    description,
    situation
  }: {
    id: string;
    description?: string | undefined;
    situation?: boolean | undefined;
  }): Promise<ProfessionalType | undefined> {
    const [result] = await this.databaseConnection.query(
      "update professional_type set description=$1, situation=$2 where id = $3 returning *",
      [description, situation, id]
    );
    if (!result) throw new AppError('Professional type not found', 404);
    return new ProfessionalType({
      id: result.id,
      description: result.description,
      situation: result.situation,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
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