import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";
import { CreateProfessionalType } from "../../../src/domain/useCases/CreateProfessionalType";

class ProfessionalTypeRepositorySpy implements ProfessionalTypeRepository {
  public description?: string;
  public situation?: boolean;

  public add({ description, situation }: { description: string; situation: boolean }) {
    this.description = description;
    this.situation = situation;
  }
}

describe('CreateProfessionalType Use Case', () => {
  it('should call ProfessionalTypeRepository with correct values', () => {
    const input = {
      description: 'some description',
      situation: true,
    };
    const professionalTypeRepository = new ProfessionalTypeRepositorySpy();
    const createTypeProfessional = new CreateProfessionalType(
      professionalTypeRepository
    );
    createTypeProfessional.execute(input);

    expect(professionalTypeRepository.description).toBe(input.description);
    expect(professionalTypeRepository.situation).toBe(input.situation);
  });
});
