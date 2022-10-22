import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";

export class ProfessionalTypeRepositorySpy implements ProfessionalTypeRepository {
  public id?: string;
  public description?: string;
  public situation?: boolean;

  public async add({
    description,
    situation
  }: { description: string; situation: boolean }) {
    this.description = description;
    this.situation = situation;
    return Promise.resolve(new ProfessionalType({
      id: 'valid_id',
      description: 'some description',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  public get({ id }: { id: string; }): Promise<ProfessionalType | undefined> {
    this.id = id;
    return Promise.resolve(undefined);
  }
}