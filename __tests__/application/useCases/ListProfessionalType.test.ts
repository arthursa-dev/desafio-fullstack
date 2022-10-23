import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ListProfessionalType } from '../../../src/application/useCases/ListProfessionalType';
import { ProfessionalTypeRepositorySpy, ProfessionalTypeRepositoryStub } from "../../testDoubles";

describe('GetProfessionalType Use Case', () => {
  it('should return a professional type list on success', async () => {
    const professionalTypeRepository = new ProfessionalTypeRepositoryStub();
    const listProfessionalType = new ListProfessionalType(
      professionalTypeRepository
    );

    const output = await listProfessionalType.execute();

    expect(output).toBeInstanceOf(Array<ProfessionalType>);
  });
});
