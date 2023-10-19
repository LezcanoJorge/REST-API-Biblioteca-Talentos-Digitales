import { Router } from 'express';
import { libros } from './controller.js';

export const router = Router()

router.get('/libros', libros.getAll);
router.post('/libros', libros.add);
router.get('/libros/:id' ,libros.getOne);
router.put('/libros',libros.update);
router.delete('/libros',libros.delete);