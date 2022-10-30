import Router from 'express';
import { CreateProfessionalType } from '../../application/useCases/CreateProfessionalType';
import { GetProfessionalType } from '../../application/useCases/GetProfessionalType';
import { ListProfessionalType } from '../../application/useCases/ListProfessionalType';
import { UpdateProfessionalType } from '../../application/useCases/UpdateProfessionalType';
import { PostgresDatabaseConnection } from '../../infra/db/postgresql/PostgresDatabaseConnection';
import { ProfessionalTypeDBRepository } from '../../infra/repositories/db/ProfessionalTypeDBRepository';

export const professionalTypeRouter = Router();
const postgresDatabaseConnection = new PostgresDatabaseConnection();
const professionalTypeDBRepository = new ProfessionalTypeDBRepository(postgresDatabaseConnection);

professionalTypeRouter.get('/', async (req, res) => {
  const listProfessionalType = new ListProfessionalType(
    professionalTypeDBRepository
  );
  const result = await listProfessionalType.execute();
  return res.json(result);
});

professionalTypeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getProfessionalType = new GetProfessionalType(
    professionalTypeDBRepository
  );
  const result = await getProfessionalType.execute({ id });
  return res.json(result);
});

professionalTypeRouter.post('/', async (req, res) => {
  const { description, situation = true } = req.body;
  const createProfessionalType = new CreateProfessionalType(
    professionalTypeDBRepository
  );
  const result = await createProfessionalType.execute({ description, situation });
  return res.status(201).json(result);
});

professionalTypeRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description, situation = true } = req.body;
  const updateProfessionalType = new UpdateProfessionalType(
    professionalTypeDBRepository
  );
  const result = await updateProfessionalType.execute({ id, description, situation });
  return res.status(201).json(result);
});
