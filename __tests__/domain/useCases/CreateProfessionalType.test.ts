import { set, reset } from 'mockdate';
import { ProfessionalType } from '../../../src/domain/entities/ProfessionalType';
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";
import { CreateProfessionalType } from "../../../src/domain/useCases/CreateProfessionalType";
import { ProfessionalTypeRepositorySpy, ProfessionalTypeRepositoryStub } from '../../testDoubles';

describe('CreateProfessionalType Use Case', () => {
  beforeAll(() => {
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  
  it('should call ProfessionalTypeRepository with correct values', async () => {
    const input = {
      description: 'some description',
      situation: true,
    };
    const professionalTypeRepository = new ProfessionalTypeRepositorySpy();
    const createTypeProfessional = new CreateProfessionalType(
      professionalTypeRepository
    );
    
    await createTypeProfessional.execute(input);

    expect(professionalTypeRepository.description).toBe(input.description);
    expect(professionalTypeRepository.situation).toBe(input.situation);
  });

  it('should throw an error if ProfessionalTypeRepository throws', () => {
    class ProfessionalTypeRepositoryStub implements ProfessionalTypeRepository {
      public async add(input: { description: string; situation: boolean; }) {
        return Promise.reject(new Error());
      }

      public get(input: { id: string; }): Promise<ProfessionalType | undefined> {
        throw new Error('Method not implemented.');
      }

      public update(input: { id: string; description: string; situation: boolean; }): Promise<ProfessionalType | undefined> {
        throw new Error('Method not implemented.');
      }

      public list(): Promise<ProfessionalType[]> {
        throw new Error('Method not implemented.');
      }
    }
    const input = {
      description: 'some description',
      situation: true,
    };
    const professionalTypeRepository = new ProfessionalTypeRepositoryStub();
    const createTypeProfessional = new CreateProfessionalType(
      professionalTypeRepository
    );
    
    expect(() => createTypeProfessional.execute(input))
      .rejects.toThrow();
  });

  it('should return a professional type data', async () => {
    const input = {
      description: 'valid description',
      situation: true,
    };
    const professionalTypeRepository = new ProfessionalTypeRepositoryStub();
    const createTypeProfessional = new CreateProfessionalType(
      professionalTypeRepository
    );

    const output = await createTypeProfessional.execute(input);

    expect(output).toEqual({
      id: 'valid_id',
      description: 'valid description',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
