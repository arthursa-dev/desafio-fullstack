import { set, reset } from 'mockdate';
import { CreateProfessional } from '../../../src/application/useCases/CreateProfessional';
import { ProfessionalRepository } from '../../../src/domain/repositories/ProfessionalRepository';
import { ProfessionalRepositorySpy } from '../../testDoubles/spies/ProfessionalRepositorySpy';

describe('CreateProfessional Use Case', () => {
  beforeAll(() => {
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  
  it('should call ProfessionalRepository with correct values', async () => {
    const input = {
      name: 'name',
      phone: '(99) 99999-9999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
    };
    const professionalRepository = new ProfessionalRepositorySpy();
    const createProfessional = new CreateProfessional(
      professionalRepository
    );
    
    await createProfessional.execute(input);

    expect(professionalRepository.name).toBe('name');
    expect(professionalRepository.phone).toBe('(99) 99999-9999');
    expect(professionalRepository.email).toBe('valid_email@mail.com');
    expect(professionalRepository.professionalType).toBe('valid_id');
    expect(professionalRepository.situation).toBe(true);
  });

  it('should throw an error if ProfessionalRepository throws', () => {
    class ProfessionalRepositoryStub implements ProfessionalRepository {
      public async add(input: {
        name: string;
        phone: string;
        email: string;
        professionalType: string;
        situation: boolean;
      }) {
        return Promise.reject(new Error());
      }
    }
    const input = {
      name: 'name',
      phone: '(99) 99999-9999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
    };
    const professionalRepository = new ProfessionalRepositoryStub();
    const createProfessional = new CreateProfessional(
      professionalRepository
    );
    
    expect(() => createProfessional.execute(input))
      .rejects.toThrow();
  });
});
