import { set, reset } from 'mockdate';
import { UpdateProfessional } from '../../../src/application/useCases/UpdateProfessional';
import { Professional } from '../../../src/domain/entities/Professional';
import { ProfessionalRepository } from '../../../src/domain/repositories/ProfessionalRepository';
import { ProfessionalRepositorySpy, ProfessionalRepositoryStub } from "../../testDoubles";

describe('UpdateProfessional Use Case', () => {
  const input = {
    id: 'valid_id',
    name: 'new name',
    phone: '(99) 99999-9998',
    email: 'valid_email@mail.com',
    professionalType: 'valid_id',
    situation: false,
  };
  
  beforeAll(() => {
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  
  it('should call ProfessionalRepository with correct values', async () => {
    const professionalRepository = new ProfessionalRepositorySpy();
    const updateProfessional = new UpdateProfessional(
      professionalRepository
    );

    await updateProfessional.execute(input);

    expect(professionalRepository.id).toBe(input.id);
    expect(professionalRepository.name).toBe(input.name);
    expect(professionalRepository.phone).toBe(input.phone);
    expect(professionalRepository.email).toBe(input.email);
    expect(professionalRepository.professionalType).toBe(input.professionalType);
    expect(professionalRepository.situation).toBe(input.situation);
  });

  it('should throw an error if ProfessionalRepository throws', async () => {
    class ProfessionalRepositoryStub implements ProfessionalRepository {
      add(input: { name: string; phone: string; email: string; professionalType: string; situation: boolean; }): Promise<Professional> {
        throw new Error('Method not implemented.');
      }
      get(input: { id: string; }): Promise<Professional> {
        throw new Error('Method not implemented.');
      }
      update(input: { id: string; name: string; phone: string; email: string; professionalType: string; situation: boolean; }): Promise<Professional> {
        throw new Error();
      }
      list(): Promise<Professional[]> {
        throw new Error('Method not implemented.');
      }
    }
    const professionalRepository = new ProfessionalRepositoryStub();
    const updateProfessional = new UpdateProfessional(
      professionalRepository
    );

    expect(() => updateProfessional.execute(input))
      .rejects.toThrow();
  });

  it('should return an updated professional data when passed an existing id', async () => {
    const professionalRepository = new ProfessionalRepositoryStub();
    const updateProfessional = new UpdateProfessional(
      professionalRepository
    );

    const output = await updateProfessional.execute(input);

    expect(output).toEqual({
      id: 'valid_id',
      name: 'new name',
      phone: '(99)99999-9998',
      email: 'valid_email@mail.com',
      professionalType: {
        id: 'valid_id',
        description: 'valid description',
        situation: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      situation: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
