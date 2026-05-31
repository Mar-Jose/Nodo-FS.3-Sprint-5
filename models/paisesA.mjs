import mongoose from 'mongoose';

const paisesASchema = new mongoose.Schema({
    nombreOfficial: { type: String, required: true},
    capital: {type: [String], required: true},
    languages: {type: [String], default: []},
    // paises limítrofes:
    borders: {type: [String], default: []},
    area: {type:Number, required: true, min: 0},
    population:{type:Number, required: true, min: 0},
    //zona horaria:
    timezones:{type: [String], default: []},
    creador:{type: String, default: 'MARIA JOSE'},
});

const paisesA = mongoose.model('paisesA',paisesASchema,'Grupo-30');

export default paisesA
