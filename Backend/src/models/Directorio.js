const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const directorioSchema = new Schema({

    nombre:String,
    directorio_padre:String,
    propietario:String,
    fecha_creacion:String

}, {
    versionKey:false
});

module.exports = model('Directorios',directorioSchema)