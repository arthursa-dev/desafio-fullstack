import { Professional } from "../../../domain/entities/Professional";
import { ProfessionalRepository } from "../../../domain/repositories/ProfessionalRepository";
import { AppError } from "../../../shared/AppError";
import { DatabaseConnection } from "../../db/DatabaseConnection";

export class ProfessionalDBRepository implements ProfessionalRepository {
  private readonly databaseConnection: DatabaseConnection;
  
  constructor(databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection;
  }

  async add({
    name,
    phone,
    email,
    professionalType,
    situation
  }: {
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }): Promise<Professional> {
    const [result] = await this.databaseConnection.query(
      "insert into professional (name, phone, email, professional_type, situation) values ($1, $2, $3, $4, $5) returning *", [
        name,
        phone,
        email,
        professionalType,
        situation
      ]);
    return new Professional({
      id: result.id,
      name: result.name,
      phone: result.phone,
      email: result.email,
      professionalType: result.professional_type,
      situation: result.situation,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  }

  async get({ id }: { id: string; }): Promise<Professional> {
    const [result] = await this.databaseConnection.query(
      "select * from professional as p join (select id as ptId, description as ptDescription, situation as ptSituation, created_at as ptCreated_at, updated_at as ptUpdated_at from professional_type) pt on pt.ptId = p.professional_type where p.id = $1",
      [id]
    );
    if (!result) throw new AppError('Professional not found', 404);
    return new Professional({
      id: result.id,
      name: result.name,
      phone: result.phone,
      email: result.email,
      professionalType: {
        id: result.ptid,
        description: result.ptdescription,
        situation: result.ptsituation,
        createdAt: result.ptcreated_at,
        updatedAt: result.ptupdated_at,
      },
      situation: result.situation,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  }

  async update({
    id,
    name,
    phone,
    email,
    professionalType,
    situation
  }: {
    id: string;
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }): Promise<Professional> {
    const [result] = await this.databaseConnection.query(
      "update professional set name=$1, phone=$2, email=$3, professional_type=$4, situation=$5 where id = $6 returning *",
      [
        name,
        phone,
        email,
        professionalType,
        situation,
        id
      ]
    );
    if (!result) throw new AppError('Professional not found', 404);
    return new Professional({
      id: result.id,
      name: result.name,
      phone: result.phone,
      email: result.email,
      professionalType: result.professional_type,
      situation: result.situation,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  }
  
  async list(): Promise<Professional[]> {
    const result = await this.databaseConnection.query(
      "select * from professional as p join (select id as ptId, description as ptDescription, situation as ptSituation, created_at as ptCreated_at, updated_at as ptUpdated_at from professional_type) pt on pt.ptId = p.professional_type",
      []
    );
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