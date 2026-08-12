import { Router } from 'express';
import {
  shoesControllerDelete,
  shoesControllerGet,
  shoesControllerGetById,
  shoesControllerPost,
} from '../controllers/shoesController';

const router = Router();

router.get('/', shoesControllerGet);

router.get('/:id', shoesControllerGetById);

router.post('/', shoesControllerPost);

router.delete('/:id', shoesControllerDelete);
export const shoesRouter = router;
