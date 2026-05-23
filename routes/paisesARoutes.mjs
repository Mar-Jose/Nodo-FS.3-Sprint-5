import express from 'express';
import {
        incorporarPaisesAdeAPIController,
        obtenerTodosLospaisesAController,
        AgregarPaisesAController,  
        rutaParaFormularioVistaAddController,
        editarPaisesAController

} from '../controllers/paisesAController.mjs';

import { paisesAValidations } from '../validations/paisesAValidaciones.mjs';
import { validate } from '../validations/validationMiddlewre.mjs';


const router = express.Router();

router.get('/', obtenerTodosLospaisesAController);
router.post('/importar', incorporarPaisesAdeAPIController);
router.get('/agregar', rutaParaFormularioVistaAddController);
router.post('/agregar', paisesAValidations, validate, AgregarPaisesAController);  

//ruta frontend (primero busca)
router.get('/heroes/editar/:id', editarPaisesAController); //editarSuperheroeController
//ruta backend (después edita )
router.put('/heroes/editar/:id', paisesAValidations, validate, actualizarSuperheroeVistaController); //superheroeValidations, validate, actualizarSuperheroeVistaController

export default router;


//paises solo en español.
//router.get( '/idioma/espanol', obtenerPaisesEspanolController);
/*RUTA PARA BUSCAR POR NOMBRE
router.get(
   '/buscar/:nombre',
   buscarPaisController
);*/