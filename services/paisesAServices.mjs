import paisesARepository from '../repositories/paisesARepository.mjs';

class paisesAServices {

    async obtenerTodos() {
        return await paisesARepository.getAll();
    }

    async obtenerPorId(id) {
        const pais = await paisesARepository.getById(id);
        if (!pais) {
            throw new Error('País no encontrado');
        }
        return pais;
    }

    async crearPais(data) {
        const existePais = await paisesARepository.existsByNombre(data.nombreOfficial);
        if (existePais) {
            throw new Error('El país ya existe');
        }

        // Sanitización 
        const nuevoPais = {
            nombreOfficial: data.nombreOfficial.trim(),

            capital: Array.isArray(data.capital)
                ? data.capital
                : [data.capital],

            languages: Array.isArray(data.languages)
                ? data.languages
                : data.languages
                    ? [data.languages]
                    : [],

            borders: typeof data.borders === 'string'
            ? data.borders
            .trim()
            .split(/\s+/)
            : [],

            area: Number(data.area),

            population: Number(data.population),

            timezones: Array.isArray(data.timezones)
                ? data.timezones
                : data.timezones
                    ? [data.timezones]
                    : [],
            creador: data.creador.trim()
        };
        return await paisesARepository.create(nuevoPais);
    }

    async editarPais(id, data) {
        const paisActualizado = await paisesARepository.update(id, data);
        if (!paisActualizado) {
            throw new Error('No se pudo actualizar el país');
        }
        return paisActualizado;
    }

    async eliminarPais(id) {
        const paisEliminado = await paisesARepository.delete(id);
        if (!paisEliminado) {
            throw new Error('No se pudo eliminar el país');
        }
        return paisEliminado;
    }

    async buscarPaisPorAtributo(atributo, valor) {
    return await paisesARepository.buscarPorAtributo(atributo, valor);
}

}
export default new paisesAServices();