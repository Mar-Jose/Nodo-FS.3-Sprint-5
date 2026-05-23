import paisesA from '../models/paisesA.mjs';
import { obtenerDeApiPaisAmericano, insertarDeApiPaisAmericano, obtenerTodosLosPaisesAmericanos, crearPaisesAmericanos, obtenerPaisesAPorId, } from '../services/paisesAmServices.mjs';
 
// Controlador para importar países
export async function incorporarPaisesAdeAPIController(req, res) {
    try {
        // Obtiene países desde API externa:
        const paises = await obtenerDeApiPaisAmericano();
        // Inserta en MongoDB:
       // const paisIncluido = await insertarDeApiPaisAmericano(paises);
       // res.status(201).json({mensaje: 'País incorporado correctamente', paisIncluido})
// xi IA
 await insertarDeApiPaisAmericano(paises);
 res.redirect('/api/paisesA?success=imported');
 // hasta aquí
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al incorporar el país desde la API', error: error.message });
    }
}

//OBTENER TODOS LOS PAÍSES
    export async function obtenerTodosLospaisesAController(req, res) {
    try {
        const paisesH = await obtenerTodosLosPaisesAmericanos();
         console.log(`Cargando dashboard con ${paisesH.length} país`);
        // Cambie .json X .render para cargar la vista y renderizar dashbord. Mensaje exitoso
        const success = req.query.success || null;
        res.render('dashboard', { title: 'Dashboard', paisesD: paisesH, success }); 
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el dashboard', error: error.message });
    }
}
// agregar routes.
export async function rutaParaFormularioVistaAddController(req, res) {
    try {    
        res.render('addpaisesA', { title: 'Agregar país' });        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al agregar el país', error: error.message });
    }    
} 
/**** Agregar país************/
export async function AgregarPaisesAController(req, res) {
  try {
     console.log("estoy en la función controlador, agregar para crear.");
    const paisEs = req.body;
    const paisPCreado = await crearPaisesAmericanos(paisEs); 
     res.redirect('/api/paisesA');
      } catch (error) {
        res.status(500).render('addpaisesA', {error:'Error al crear el país.'});
      }
    };
/***Editar*************/
 export async function editarPaisesAController(req, res, next) {
    try {
      console.log("estoy en la capa controllers, f:editar");
        const { id } = req.params; 
        const heroe = await obtenerPaisesAPorId(id);

        if (!heroe) {
           const error = new Error('País no encontrado');
           error.status = 404;
           throw error;
        }

        // Renderizar el formulario de edición con los datos del héroe
        return res.render('editpaisesA', { title: 'Editar País', paisesA }); //consultar sobre la variable paisesA

        } catch (error) {
        next(error);
        }
    }

     // Sprint 3. tp 3. Etapa 4. Requerimiento 3 formulario edit...
 export async function actualizarSuperheroeVistaController(req, res, next) {
  console.log("estoy en la capa controllers, f:actualizar-vista");
    const { id } = req.params;
    const datosSuperheroe = req.body;
    
    // Si el middleware 'validate' guardó errores para vista, úsalos
    const erroresValidacion = req.validationErrors || [];
    
    if (erroresValidacion.length > 0) {
      const heroe = await obtenerSuperHeroePorId(id);
      return res.status(400).render('editSuperhero', {
                title: 'Editar Superhéroe',
                heroe,
                errores: erroresValidacion,
            });
        }

    try {
        // Procesar arrays: convertir strings separados por coma en arrays
        if (datosSuperheroe.poderes) {
            datosSuperheroe.poderes = datosSuperheroe.poderes.split(',').map(p => p.trim());
        }
        if (datosSuperheroe.aliados) {
            datosSuperheroe.aliados = datosSuperheroe.aliados.split(',').map(a => a.trim());
        }
        if (datosSuperheroe.enemigos) {
            datosSuperheroe.enemigos = datosSuperheroe.enemigos.split(',').map(e => e.trim());
        }

        const superheroeActualizado = await actualizarSuperHeroe(id, datosSuperheroe);
        
        if (!superheroeActualizado) {
        const error = new Error("Superhéroe no fue encontrado para su actualización");
            error.status = 404;
            throw error;
        }
        //res.render('editSuperhero', { heroe: heroe});
        // sprint 3. tp 3. Etapa &. Requerimiento 3.
        //   return res.render('editSuperhero', { heroe });
        //sprint idem anterior + mjs exito (profe Matín)
        return res.redirect('/api/heroes?success=updated'); 
        } catch (error) {
        next(error);
        }
    }
/***********consultar sobre si borders llevaría , comas  **********************************/
  /**** 
export async function AgregarPaisesAController(req, res, next) {
    // Si el middleware 'validate' guardó errores para vista, úsalos
    const erroresValidacion = req.validationErrors || [];

    if (erroresValidacion.length > 0) {
        console.log(" Errores de validación:", erroresValidacion);
        return res.status(400).render('addpaisesA', {
            title: 'Agregar país hispanohablante',
            errores: erroresValidacion
        });
    }

    try {
        const datos = req.body;
        console.log("Datos recibidos en controlador:", datos);

        if (datos.borders) {
            datos.borders = datos.borders.split(',').map(p => p.trim());
        }

        console.log(" Datos procesados antes de guardar:", datos);
        const resultado = await crearSuperHeroe(datos);
        console.log(" País guardado con ID:", resultado._id);

        //return res.redirect('/api/paisesA');
        return res.redirect('/api/paisesA?success=created'); 
        
    } catch (error) {
        console.error(" Error al cargar el país:", error.message);
        next(error); 
    }
}

***********hasta aquí*********************************************************************/
