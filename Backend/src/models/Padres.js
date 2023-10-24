const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const padresSchema = new Schema({

    path:String,
    propietario:String

}, {
    versionKey:false
});

module.exports = model('padres',padresSchema)