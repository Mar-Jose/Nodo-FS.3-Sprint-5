
   class IRepository {

    async getAll() {
        throw new Error('Método getAll() no implementado');
    }

    async getById(id) {
        throw new Error('Método getById() no implementado');
    }

    async create(data) {
        throw new Error('Método create() no implementado');
    }

    async update(id, data) {
        throw new Error('Método update() no implementado');
    }

    async delete(id) {
        throw new Error('Método delete() no implementado');
    }
    buscarPorAtributo(atributo,valor){
        throw new Error ("Metodo 'buscarPorAtributo()' no implementado");
    }
   }

export default IRepository;