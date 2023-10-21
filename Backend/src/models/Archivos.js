const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const archivoSchema = new Schema({

    nombre:String,
    extension:String,
    contenido:String,
    directorio_padre:String,
    propietario:String,
    fecha_creacion:Date,
    fecha_compartido:Date,
    hora_compartido:String

}, {
    versionKey:false
});

module.exports = model('Archivos',archivoSchema);