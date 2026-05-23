// Sprint 3 tp 2.

import { validationResult } from 'express-validator';

/**
 * Middleware de validación genérico
 * Detecta automáticamente si es API (JSON) o vista (HTML)
 * - Si es API: devuelve JSON
 * - Si es vista: renderiza HTML con errores
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Si es una ruta de vista (contiene '/editar' o '/agregar'), siempre es formulario
    const esRutaVista = req.originalUrl.includes('/editar') || req.originalUrl.includes('/agregar');

    if (esRutaVista) {
      //  VISTA: Pasar errores al controlador para que renderice
      req.validationErrors = errors.array();
      return next();
    } else {
      // API: Devolver JSON
      return res.status(400).json({
          estado: 'error',
          mensaje: 'La validación fallo',
          errores: errors.array().map(error => ({
              campo: error.path,
              mensaje: error.msg,
          }))
      });
    }
  }
  next();
};