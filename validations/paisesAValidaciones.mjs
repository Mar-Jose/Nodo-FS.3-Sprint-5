//  Todas las validaciones del sprint 5.

import { body, param } from 'express-validator';

export const paisesAValidations = [
  
  body('nombreOfficial')
    .notEmpty()
    .withMessage('El nombre Oficial del país es requerido')
    .trim()
    .isLength({ min: 3, max: 90 })
    .withMessage('El nombre oficial del país debe tener entre 3 y 90 caracteres'),

body('capital')
    .notEmpty()
    .withMessage('La capital es requerida')
    .trim()
    .isLength({ min: 3, max: 90 })
    .withMessage('cada elemento tiene entre 3 a 90 carácteres'),

body('borders')
  .isArray({ min: 1 })
  .withMessage('Debe enviar al menos un país limítrofe'),
body('borders.*')
  .matches(/^[A-Z]{3}$/)
  .withMessage('Cada código debe tener 3 letras mayúsculas'),
    
  body('area')
    .trim()
    .notEmpty()
    .withMessage('El área del país es requerida')
    .isNumeric()
    .withMessage('El área debe ser un número')
    .isInt({ min: 0 })
    .withMessage('El área del país debe ser un número positivo'),

body('population')
    .trim()
    .notEmpty()
    .withMessage('La población del país es requerida')
    .isNumeric()
    .withMessage('La población debe ser un número entero')
    .isInt({ min: 0 })
    .withMessage('La población del país debe ser un número positivo'),

    /****************************/  

    body('creador')
        .trim()
        .notEmpty()
        .withMessage('El nombre creador siempre es requerido')
        .isLength({ min: 3, max: 90 })
        .withMessage('El nombre del creador del país es necesario y debe tener entre 3 y 90 caracteres'),

];