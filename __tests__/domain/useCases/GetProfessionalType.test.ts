import { set, reset } from 'mockdate';
import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../../src/domain/repositories/ProfessionalTypeRepository";
import { GetProfessionalType } from "../../../src/domain/useCases/GetProfessionalType";
import { ProfessionalTypeRepositorySpy, ProfessionalTypeRepositoryStub } from "../../testDoubles";

describe('GetProfessionalType Use Case', () => {
  beforeAll(() => {
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  
  it('should call ProfessionalTypeRepository with correct values', async () => {
    const input = {
      id: 'valid_id',
    };
    const professionalTypeRepository = new ProfessionalTypeRepositorySpy();
    const getProfessionalType = new GetProfessionalType(
      professionalTypeRepository
    );

    await getProfessionalType.execute(input);

    expect(professionalTypeRepository.id).toBe(input.id);
  });

  it('should throw an error if ProfessionalTypeRepository throws', async () => {
    class ProfessionalTypeRepositoryStub implements ProfessionalTypeRepository {
      add(input: { description: string; situation: boolean; }): Promise<ProfessionalType> {
        throw new Error("Method not implemented.");
      }
      get(input: { id: string; }): Promise<ProfessionalType | undefined> {
        throw new Error();
      }
      update(input: { id: string; description: string; situation: boolean; }): Promise<ProfessionalType | undefined> {
        throw new Error('Method not implemented.');
      }
    }
    const input = {
      id: 'any_id',
    };
    const professionalTypeRepository = new ProfessionalTypeRepositoryStub();
    const getProfessionalType = new GetProfessionalType(
      professionalTypeRepository
    );

    expect(() => getProfessionalType.execute(input))
      .rejects.toThrow();
  });

  it('should return undefined if professional type with passed id doesn\'t exist', async () => {
    const input = {
      id: 'valid_id',
    };
    const professionalTypeRepository = new ProfessionalTypeRepositoryStub();
    professionalTypeRepository.output = undefined;
    const getProfessionalType = new GetProfessionalType(
      professionalTypeRepository
    );

    const output = await getProfessionalType.execute(input);

    expect(output).toBeUndefined();
  });

  it('should return a professional type data when passed an existing id', async () => {
    const input = {
      id: 'valid_id',
    };
    const professionalTypeRepository = new ProfessionalTypeRepositoryStub();
    const getProfessionalType = new GetProfessionalType(
      professionalTypeRepository
    );

    const output = await getProfessionalType.execute(input);

    expect(output).toEqual({
      id: 'valid_id',
      description: 'valid description',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
