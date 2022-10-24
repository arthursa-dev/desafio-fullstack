import Router from 'express';
import { ListProfessionalType } from '../../application/useCases/ListProfessionalType';
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
