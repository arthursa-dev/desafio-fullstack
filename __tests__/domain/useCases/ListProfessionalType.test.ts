import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";
import { GetProfessionalType } from "../../../src/domain/useCases/GetProfessionalType";
import { ListProfessionalType } from '../../../src/domain/useCases/ListProfessionalType';
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
