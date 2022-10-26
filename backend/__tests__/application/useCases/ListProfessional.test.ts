import { ListProfessional } from "../../../src/application/useCases/ListProfessional";
import { ProfessionalRepositoryStub } from "../../testDoubles";

describe('ListProfessional Use Case', () => {
  it('should return a professional list on success', async () => {
    const professionalRepository = new ProfessionalRepositoryStub();
    const listProfessional = new ListProfessional(
      professionalRepository
    );

    const output = await listProfessional.execute();

    expect(output).toBeInstanceOf(Array<{
      id: string;
      name: string;
      phone: string;
      email: string;
      professionalType: {
        id: string;
        description: string;
        situation: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
      situation: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>);
  });
});
