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

/**
 * @swagger
 * components:
 *  schemas:
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
 *   name: Tipo do Profissional
 */

/**
 * @swagger
 * /professional-type:
 *   get:
 *     summary: Retorna uma lista com todos os tipos dos profissionais cadastrados
 *     tags: [Tipo do Profissional]
 *     responses:
 *       200:
 *         description: lista dos tipos dos profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfessionalType'
 */
professionalTypeRouter.get('/', async (req, res) => {
  const listProfessionalType = new ListProfessionalType(
    professionalTypeDBRepository
  );
  const result = await listProfessionalType.execute();
  return res.json(result);
});

/**
 * @swagger
 * /professional-type/{id}:
 *   get:
 *     summary: Retorna um tipo do profissional pelo ID
 *     tags: [Tipo do Profissional]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tipo do profissional
 *     responses:
 *       200:
 *         description: Dados do tipo do profissional referente ao ID passado por parâmetro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalType'
 *       404:
 *         description: O tipo do profissional não foi encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
professionalTypeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getProfessionalType = new GetProfessionalType(
    professionalTypeDBRepository
  );
  const result = await getProfessionalType.execute({ id });
  return res.json(result);
});

/**
 * @swagger
 * /professional-type:
 *   post:
 *     summary: Cria um novo tipo do profissional
 *     tags: [Tipo do Profissional]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               situation:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: O tipo do profissional foi criado com sucesso 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalType'
 */
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
