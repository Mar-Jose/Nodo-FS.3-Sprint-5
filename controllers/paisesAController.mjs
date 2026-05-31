import paisesAServices from '../services/paisesAServices.mjs';


export const obtenerTodosLospaisesAController = async (req, res) => {
    try {
        const paisesD = await paisesAServices.obtenerTodos();
        console.log(`Cargando dashboard con ${paisesD.length} paisesD`);
        res.render('dashboard', { paisesD, success: req.query.success || null });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error obteniendo países', error: error.message });}
};

/*** FORMULARIO ADD *******************/
export const rutaParaFormularioVistaAddController = (req, res) => {
         res.render('addPaisesA');
};

/*** CREAR PAÍS *******************/
export const AgregarPaisesAController = async (req, res) => {
    try {
        await paisesAServices.crearPais(req.body);
        res.redirect('/api/paisesA?success=created');

    } catch (error) {
        console.error(error);
        res.status(400).json({
            mensaje: 'Error creando país',
            error: error.message
        }); }
};

export const mostrarFormularioEdicionController = async (req, res) => {
    try {
        const { id } = req.params;
        // Obtiene el país por su ID
        const paisE = await paisesAServices.obtenerPorId(id);
        // Renderiza la vista de edición
        res.render('editPaisesA', { title: 'Editar País', paisesE: paisE });
    } catch (error) {
        res.status(404).json({ mensaje: 'País no encontrado', error: error.message });
    }
};

export const editarPaisesAController = async (req, res) => {
    try {
        const { id } = req.params;
        await paisesAServices.editarPais(id, req.body);
        res.redirect('/api/paisesA?success=updated');

    } catch (error) {
        console.error(error);
        res.status(400).json({mensaje: 'Error editando país', error: error.message});

    }

};

export const eliminarPaisesAController = async (req, res) => {
    try {
        const { id } = req.params;
        await paisesAServices.eliminarPais(id);
        res.redirect('/api/paisesA');

    } catch (error) {
        console.error(error);
        res.status(400).json({
            mensaje: 'Error eliminando país',
            error: error.message
        }); }
};                     
export async function buscarPaisPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.query;   // cambié params x "query" para recibir datos del formulario-búsqueda.
        const paisT = await   paisesAServices.buscarPaisPorAtributo(atributo, valor);
        if (paisT.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron países con ese atributo' });
        }   
       // Sprint 4.1  
           res.render('dashboard', {title: 'Resultados', paisesD: paisT, success: null });                   
     // Cambié .json x .render para cargar la vista y renderizar resultados de búsqueda. Mensaje exitoso 
      
    } catch (error) {
            return res.status(500).send({ mensaje: 'Error al buscar el país', error: error.message });
    }
}
export async function mostrarVistaBusquedaController(req, res) {
    try {
        res.render('searchPais', {title: 'Buscar País '});
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar búsqueda', error: error.message });
 }
}
