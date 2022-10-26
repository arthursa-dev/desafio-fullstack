import { Professional } from "../../../domain/entities/Professional";
import { ProfessionalRepository } from "../../../domain/repositories/ProfessionalRepository";
import { DatabaseConnection } from "../../db/DatabaseConnection";

export class ProfessionalDBRepository implements ProfessionalRepository {
  private readonly databaseConnection: DatabaseConnection;
  
  constructor(databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection;
  }

  add(input: { name: string; phone: string; email: string; professionalType: string; situation: boolean; }): Promise<Professional> {
    throw new Error("Method not implemented.");
  }

  get(input: { id: string; }): Promise<Professional> {
    throw new Error("Method not implemented.");
  }

  update(input: { id: string; name: string; phone: string; email: string; professionalType: string; situation: boolean; }): Promise<Professional> {
    throw new Error("Method not implemented.");
  }
  
  async list(): Promise<Professional[]> {
    const result = await this.databaseConnection.query(
      "select * from professional as p join (select id as ptId, description as ptDescription, situation as ptSituation, created_at as ptCreated_at, updated_at as ptUpdated_at from professional_type) pt on pt.ptId = p.professional_type",
      []
    );
    console.log("🚀 ~ file: ProfessionalDBRepository.ts ~ line 29 ~ ProfessionalDBRepository ~ list ~ result", result)
    return result.map((professionalData: any) => new Professional({
      id: professionalData.id,
      name: professionalData.name,
      phone: professionalData.phone,
      email: professionalData.email,
      professionalType: {
        id: professionalData.ptid,
        description: professionalData.ptdescription,
        situation: professionalData.ptsituation,
        createdAt: professionalData.ptcreated_at,
        updatedAt: professionalData.ptupdated_at,
      },
      situation: professionalData.situation,
      createdAt: professionalData.created_at,
      updatedAt: professionalData.updated_at,
    }));
  }
}