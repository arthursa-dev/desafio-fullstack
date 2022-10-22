import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";
import { UpdateProfessionalType } from "../../../src/domain/useCases/UpdateProfessionalType";
import { ProfessionalTypeRepositorySpy } from "../../testDoubles";

describe('UpdateProfessionalType Use Case', () => {
  it('should call ProfessionalTypeRepository with correct values', async () => {
    const input = {
      id: 'valid_id',
      description: 'updated description',
      situation: false,
    };
    const professionalTypeRepository = new ProfessionalTypeRepositorySpy();
    const updateProfessionalType = new UpdateProfessionalType(
      professionalTypeRepository
    );

    await updateProfessionalType.execute(input);

    expect(professionalTypeRepository.id).toBe(input.id);
    expect(professionalTypeRepository.description).toBe(input.description);
    expect(professionalTypeRepository.situation).toBe(input.situation);
  });
});
