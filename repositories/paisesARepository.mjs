import IRepository from './IRepository.mjs';
import paisesA from '../models/paisesA.mjs';

class paisesARepository extends IRepository {

    async getAll() {
        return await paisesA.find().lean();
    }
    async getById(id) {
        return await paisesA.findById(id).lean();
    }
    async create(data) {
        return await paisesA.create(data);
    }
    async update(id, data) {
        return await paisesA.findByIdAndUpdate( id, data,
            { new: true,
              runValidators: true
            });
    }
    async delete(id) {
        return await paisesA.findByIdAndDelete(id);
    }
    async existsByNombre(nombreOfficial) {
        return await paisesA.findOne({ nombreOfficial });
    }
    async buscarPorAtributo(atributo, valor) {
        return await paisesA.find({ [atributo]: valor });
    }
}

export default new paisesARepository();
