import Router from 'express';
import { professionalTypeRouter } from './professionalType.routes';

export const router = Router();

router.use('/professional-type', professionalTypeRouter);
