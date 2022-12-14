import { set, reset } from 'mockdate';
import { CreateProfessional } from '../../../src/application/useCases/CreateProfessional';
import { Professional } from '../../../src/domain/entities/Professional';
import { ProfessionalRepository } from '../../../src/domain/repositories/ProfessionalRepository';
import { ProfessionalRepositorySpy, ProfessionalRepositoryStub } from '../../testDoubles';

describe('CreateProfessional Use Case', () => {
  const input = {
    name: 'name',
    phone: '(99) 99999-9999',
    email: 'valid_email@mail.com',
    professionalType: 'valid_id',
    situation: true,
  };
  
  beforeAll(() => {
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  
  it('should call ProfessionalRepository with correct values', async () => {
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

      public get(input: { id: string; }): Promise<Professional> {
        throw new Error("Method not implemented.");
      }

      public update(input: {
        name: string;
        phone: string;
        email: string;
        professionalType: string;
        situation: boolean;
      }): Promise<Professional> {
        throw new Error('Method not implemented.');
      }

      public list(): Promise<Professional[]> {
        throw new Error('Method not implemented.');
      }
    }
    const professionalRepository = new ProfessionalRepositoryStub();
    const createProfessional = new CreateProfessional(
      professionalRepository
    );
    
    expect(() => createProfessional.execute(input))
      .rejects.toThrow();
  });

  it('should return professional data on success', async () => {
    const professionalRepository = new ProfessionalRepositoryStub();
    const createProfessional = new CreateProfessional(
      professionalRepository
    );

    const output = await createProfessional.execute(input);

    expect(output).toEqual({
      id: 'valid_id',
      name: 'name',
      phone: '(99)99999-9999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
