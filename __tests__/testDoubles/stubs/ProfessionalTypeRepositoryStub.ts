import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";

export class ProfessionalTypeRepositoryStub implements ProfessionalTypeRepository {
  public output? = new ProfessionalType({
    id: 'valid_id',
    description: 'valid description',
    situation: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  public async add(
    { description, situation }: { description: string; situation: boolean }
  ) {
    return Promise.resolve(this.output!);
  }

  public get(input: { id: string; }): Promise<ProfessionalType | undefined> {
    return Promise.resolve(this.output);
  }
}