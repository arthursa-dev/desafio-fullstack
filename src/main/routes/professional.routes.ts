import Router from 'express';
import { ListProfessional } from '../../application/useCases/ListProfessional';
import { PostgresDatabaseConnection } from '../../infra/db/postgresql/PostgresDatabaseConnection';
import { ProfessionalDBRepository } from '../../infra/repositories/db/ProfessionalDBRepository';

export const professionalRouter = Router();
const postgresDatabaseConnection = new PostgresDatabaseConnection();
const professionalDBRepository = new ProfessionalDBRepository(postgresDatabaseConnection);

professionalRouter.get('/', async (req, res) => {
  const listProfessional = new ListProfessional(
    professionalDBRepository
  );
  const result = await listProfessional.execute();
  return res.json(result);
});
