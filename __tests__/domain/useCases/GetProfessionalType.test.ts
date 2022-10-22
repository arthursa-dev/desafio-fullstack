import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";
import { GetProfessionalType } from "../../../src/domain/useCases/GetProfessionalType";

class ProfessionalTypeRepositorySpy implements ProfessionalTypeRepository {
  public id?: string;
  
  add(input: { description: string; situation: boolean; }): Promise<ProfessionalType> {
    throw new Error("Method not implemented.");
  }
  get({ id}: { id: string; }): Promise<ProfessionalType | undefined> {
    this.id = id;
    return Promise.resolve(undefined);
  }
}

describe('GetProfessionalType Use Case', () => {
  it('should call ProfessionalTypeRepository with correct values', async () => {
    const input = {
      id: 'valid_id',
    };
    const professionalTypeRepository = new ProfessionalTypeRepositorySpy();
    const getProfessionalType = new GetProfessionalType(
      professionalTypeRepository
    );

    await getProfessionalType.execute(input);

    expect(professionalTypeRepository.id).toBe(input.id);
  });
});
