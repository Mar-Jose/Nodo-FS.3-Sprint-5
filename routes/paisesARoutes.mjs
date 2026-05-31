import express from 'express';
import {
        obtenerTodosLospaisesAController,
        AgregarPaisesAController,  
        rutaParaFormularioVistaAddController,
        mostrarFormularioEdicionController,
        editarPaisesAController,
        eliminarPaisesAController,
        buscarPaisPorAtributoController,
        mostrarVistaBusquedaController

} from '../controllers/paisesAController.mjs';

import { paisesAValidations } from '../validations/paisesAValidaciones.mjs';
import { validate } from '../validations/validationMiddlewre.mjs';

const router = express.Router();

router.get('/', obtenerTodosLospaisesAController);
router.get('/agregar', rutaParaFormularioVistaAddController);
router.post('/agregar', paisesAValidations, validate, AgregarPaisesAController);
//ruta frontend (primero busca, para MOSTRAR el formulario-"renderiza la vista")
router.get('/editar/:id', mostrarFormularioEdicionController);
router.get('/buscar',  buscarPaisPorAtributoController);
router.get('/mostrar', mostrarVistaBusquedaController);
//ruta backend (después edita )
router.put('/editar/:id', paisesAValidations, validate, editarPaisesAController); //superheroeValidations, validate, actualizarSuperheroeVistaController
router.delete('/id/:id', eliminarPaisesAController);

export default router;
