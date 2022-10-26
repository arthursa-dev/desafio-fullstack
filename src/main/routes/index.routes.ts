import Router from 'express';
import { professionalRouter } from './professional.routes';
import { professionalTypeRouter } from './professionalType.routes';

export const router = Router();

router.use('/professional-type', professionalTypeRouter);
router.use('/professional', professionalRouter);
