import Router from 'express';
import { CreateProfessional } from '../../application/useCases/CreateProfessional';
import { GetProfessional } from '../../application/useCases/GetProfessional';
import { ListProfessional } from '../../application/useCases/ListProfessional';
import { UpdateProfessional } from '../../application/useCases/UpdateProfessional';
import { PostgresDatabaseConnection } from '../../infra/db/postgresql/PostgresDatabaseConnection';
import { ProfessionalDBRepository } from '../../infra/repositories/db/ProfessionalDBRepository';

export const professionalRouter = Router();
const postgresDatabaseConnection = new PostgresDatabaseConnection();
const professionalDBRepository = new ProfessionalDBRepository(postgresDatabaseConnection);

/**
 * @swagger
 * components:
 *  schemas:
 *    Professional:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        phone:
 *          type: string
 *        email:
 *          type: string
 *        professionalType:
 *          $ref: '#/components/schemas/ProfessionalType'
 *        situation:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    ProfessionalType:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        description:
 *          type: string
 *        situation:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @swagger
 * tags:
 *   name: Professional
 */

/**
 * @swagger
 * /professional:
 *   get:
 *     summary: Retorna uma lista com todos os profissionais cadastrados
 *     tags: [Professional]
 *     responses:
 *       200:
 *         description: lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professional'
 */
professionalRouter.get('/', async (req, res) => {
  const listProfessional = new ListProfessional(
    professionalDBRepository
  );
  const result = await listProfessional.execute();
  return res.json(result);
});

professionalRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getProfessional = new GetProfessional(
    professionalDBRepository
  );
  const result = await getProfessional.execute({ id });
  return res.json(result);
});

professionalRouter.post('/', async (req, res) => {
  const {
    name,
    phone,
    email,
    professionalType,
    situation,
  } = req.body;
  const createProfessional = new CreateProfessional(
    professionalDBRepository
  );
  const result = await createProfessional.execute({
    name,
    phone,
    email,
    professionalType,
    situation,
  });
  return res.status(201).json(result);
});

professionalRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    phone,
    email,
    professionalType,
    situation,
  } = req.body;
  const updateProfessional = new UpdateProfessional(
    professionalDBRepository
  );
  const result = await updateProfessional.execute({
    id,
    name,
    phone,
    email,
    professionalType,
    situation,
  });
  return res.status(201).json(result);
});
