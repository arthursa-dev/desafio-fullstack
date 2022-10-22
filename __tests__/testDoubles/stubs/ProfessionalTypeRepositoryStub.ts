import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";

export class ProfessionalTypeRepositoryStub implements ProfessionalTypeRepository {
  public async add(
    { description, situation }: { description: string; situation: boolean }
  ) {
    return Promise.resolve(new ProfessionalType({
      id: 'valid_id',
      description: 'valid description',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  public get(input: { id: string; }): Promise<ProfessionalType | undefined> {
    throw new Error('Method not implemented.');
  }
}