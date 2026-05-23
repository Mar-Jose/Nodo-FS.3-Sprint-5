
import paisesA from "../models/paisesA.mjs";
import IRepository from "./IRepository.mjs";

class paisesARepository extends IRepository {

 async obtenerDeApiP(){
        try{
        
            const response = await fetch('https://restcountries.com/v3.1/region/americas');
            if (!response.ok) { throw new Error(`Error HTTP: ${response.status}`);}

            const data = await response.json();
        
            const paisesEsp = data
                .filter(pais => pais.languages?.spa)
                 .map(pais => {
                 return {
                        nombrePais: pais?.name?.common ?? pais?.name?.official ?? 'Sin nombre',
                        nombreOfficial: pais?.name?.official ?? pais?.name?.common ?? 'Sin nombre oficial',
                        capital: pais?.capital?? [],
                        population: pais?.population ?? 0,
                        lenguajes: pais?.languages ? Object.values(pais?.languages): [],
                        area: pais?.area ?? 0,
                        //zona horaria:
                        timezones: pais?.timezones ?? [],
                        //países Limítrofe:
                        borders: pais?.borders ??[],
                        creador: 'María José'
                    };
              });
            return paisesEsp;
        
        }catch(error){
        
            console.error('ERROR al obtener el país de la API:', error);
            throw error;
        
        }
    }
/****************consultar***************/
async importarDeApiP(paisesData){
        const introducir = paisesData.map(paisesA => ({
            updateOne: {
                filter: { 
                    nombreOfficial: paisesA.nombreOfficial,
                    creador: 'María José'
                },
                update: { $setOnInsert: paisesA },
                upsert: true
            }
        }));
        return await paisesA.bulkWrite(introducir);
    }   
/***********hasta aquí*****************/
//async obtenerTodos() {
//       return await superHero.find({});
//    }

async obtenerTodos() {
        return await paisesA.find({
            nombrePais: { $exists: true },
            creador: "María José"
        }).lean();
    }

async crearPaisesA (valor) {
        const nuevo = new paisesA(valor);
        console.log("estoy capa Repo-f-crear");
        return await nuevo.save();
    }
    // para editar 2: 
    async actualizarPaisesA(id, datos) {
        try {
            // { new: true } asegura que devuelva el documento actualizado
            return await paisesA.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
        } catch (error) {
            throw new Error(`Error al actualizar en DB: ${error.message}`);
        }
    }
    async obtenerPaisesAPorId(id) {
        return await paisesA.findById(id);
    }


}
    export default new paisesARepository;

    /*
    async buscarPorAtributo(atributo, valor) {
        return await superHero.find({ [atributo]: valor });
    }
    async obtenerMayoresDe30() {
       // return await superHero.find({edad: { $gt: 30 }, planetaOrigen: "Tierra", $expr: { $gt: [ {$size: { $ifNull: [ "$poderes", [] ]}}, 1 ]} });
    const superheroefiltrado= await superHero.find({edad: { $gt: 30 }, planetaOrigen: "Tierra", $expr: { $eq: [ {$size: { $ifNull: [ "$poderes", [] ]}}, 1 ]} });
    console.log ("estoy en la capa persistencia, clase superherorepositorio, función obtener mayores de 30 que devuelve superheroefiltrado " + superheroefiltrado );
    return superheroefiltrado;
    // eq: igual. lt= menos que. gt: mayor que. gte=mayor o igual que. 
    }

    // sprint 3. tp 1.
    async crearHeroe (valor) {
    const nuevo = new superHero(valor);
     console.log("estoy capa Repo-f-crear");
    return await nuevo.save();
  }

  async actualizarHeroe (id, valor) {
     console.log("estoy capa Repo-f-actualizar");
     console.log("actualizar valor: " +valor);
    return await superHero.findByIdAndUpdate(id, valor, { returnDocument: 'after' });
   
  }

  async eliminarHeroexId(id) {
    console.log("estoy capa Repo-f-eliminar x id");
    return await superHero.findByIdAndDelete(id);
  }

  async eliminarHeroexNombre(nombre) {
    console.log("estoy capa Repo-f-elimina x nombre");
    return await superHero.findOneAndDelete({ nombreSuperHeroe: nombre });
  }
  */
