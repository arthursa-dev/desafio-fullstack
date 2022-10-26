import { set, reset } from 'mockdate';
import { GetProfessional } from '../../../src/application/useCases/GetProfessional';
import { Professional } from '../../../src/domain/entities/Professional';
import { ProfessionalRepository } from '../../../src/domain/repositories/ProfessionalRepository';
import { ProfessionalRepositorySpy, ProfessionalRepositoryStub } from '../../testDoubles';

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

      update(input: {
        name: string;
        phone: string;
        email: string;
        professionalType: string;
        situation: boolean;
      }): Promise<Professional> {
        throw new Error('Method not implemented.');
      }

      list(): Promise<Professional[]> {
        throw new Error('Method not implemented.');
      }
    }
    const professionalRepository = new ProfessionalRepositoryStub();
    const getProfessional = new GetProfessional(
      professionalRepository
    );

    expect(() => getProfessional.execute(input))
      .rejects.toThrow();
  });

  it('should return professional data when passed an existing id', async () => {
    const input = {
      id: 'valid_id',
    };
    const professionalRepository = new ProfessionalRepositoryStub();
    const getProfessional = new GetProfessional(
      professionalRepository
    );

    const output = await getProfessional.execute(input);

    expect(output).toEqual({
      id: 'valid_id',
      name: 'name',
      phone: '(99)99999-9999',
      email: 'valid_email@mail.com',
      professionalType: {
        id: 'valid_id',
        description: 'valid description',
        situation: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
