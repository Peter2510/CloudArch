const Archivos = require('../models/Archivos')

const listarArchivos = async (req, res) => {

    const usuario = req.query.usuario;
    const directorio = req.query.directorio_padre;

    const archivos = await Archivos.find({
        propietario:usuario,
        directorio_padre:directorio

    }).exec();

    res.json(archivos);

}

const editarContenido = async(req,res)=>{

    const { _id, contenido } = req.body;

    console.log(req.body);

    const edicion = await Archivos.updateOne({
        _id:Object(_id)
    },
    {
        $set:{
            contenido:contenido
        }
    }
    ).exec();

    if(edicion.matchedCount==1){
        res.json({update:true});
    }else{
        res.json({update:false});
    }

    

}


module.exports = {
    listarArchivos,
    editarContenido
}