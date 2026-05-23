import mongoose from 'mongoose';

const paisesASchema = new mongoose.Schema({
    nombrePais: {type: String, required : true, unique: true },
    nombreOfficial: { type: String, required: true, unique: true },
    capital: {type: [String], required: true},
    lenguajes: {type: [String], default: []},
    // paises limítrofes:
    borders: {type: [String], default: []},
    area: {type:Number, required: true, min: 0},
    population:{type:Number, required: true, min: 0},
    //zona horaria:
    timezones:{type: [String], default: []},
    creador:{type: String, default: 'María José'},
});

const paisesA = mongoose.model('paisesA',paisesASchema,'Grupo-30');

export default paisesA
