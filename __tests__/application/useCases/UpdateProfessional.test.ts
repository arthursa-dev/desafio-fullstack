import { set, reset } from 'mockdate';
import { UpdateProfessional } from '../../../src/application/useCases/UpdateProfessional';
import { ProfessionalRepositorySpy } from "../../testDoubles";

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
});
