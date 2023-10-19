const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const usuarioSchema = new Schema({

    nombre:String,
    usuario:String,
    contrasenia:String,
    rol:Number
}, {
    versionKey:false
});

module.exports = model('Usuarios',usuarioSchema)