import mongoose from 'mongoose';

const paisesASchema = new mongoose.Schema({
    nombrePais: {type:String,required:true},
    nombreOficial: { type: String, required: true },
    capital: {type: String, required: true},
    lenguajes: {type: [String], default: []},
    // paises limítrofes:
    borders: {type: [String], required: true},
    area: {type:Number, required: true},
    population:{type:Number, required: true},
//  gini. (avanzado)
    //zona horaria:
    timezones:{type: [String], required: true},
    
    creador:{type: String, default: 'María José'},
});

const paisesA = mongoose.model('paisesA',paisesASchema,'Grupo-30');

export default paisesA
