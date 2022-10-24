import { set, reset } from 'mockdate';
import { GetProfessional } from '../../../src/application/useCases/GetProfessional';
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
});
