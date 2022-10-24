import { set, reset } from 'mockdate';
import { GetProfessional } from '../../../src/application/useCases/GetProfessional';
import { Professional } from '../../../src/domain/entities/Professional';
import { ProfessionalRepository } from '../../../src/domain/repositories/ProfessionalRepository';
import { ProfessionalRepositorySpy } from '../../testDoubles';

describe('GetProfessional Use Case', () => {
  const input = {
    id: 'valid_id',
  };
  
  beforeAll(() => {
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  
  it('should call ProfessionalRepository with correct values', async () => {
    const professionalRepository = new ProfessionalRepositorySpy();
    const getProfessional = new GetProfessional(
      professionalRepository
    );

    await getProfessional.execute(input);

    expect(professionalRepository.id).toBe(input.id);
  });

  it('should throw an error if ProfessionalRepository throws', async () => {
    class ProfessionalRepositoryStub implements ProfessionalRepository {
      add(input: {
        name: string;
        phone: string;
        email: string;
        professionalType: string;
        situation: boolean;
      }): Promise<Professional> {
        throw new Error("Method not implemented.");
      }
      
      get(input: { id: string; }): Promise<Professional> {
        throw new Error();
      }
    }
    const professionalRepository = new ProfessionalRepositoryStub();
    const getProfessional = new GetProfessional(
      professionalRepository
    );

    expect(() => getProfessional.execute(input))
      .rejects.toThrow();
  });
});
