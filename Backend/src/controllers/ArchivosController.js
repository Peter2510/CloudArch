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

const obtenerArchivo = async(req ,res)=>{

    const nombre = req.query.nombre;
    const extension = req.query.extension;
    const directorio_padre = req.query.directorio_padre;
    const propietario = req.query.propietario;
    
    const archivo = await Archivos.findOne({
        nombre:nombre,
        extension:extension,
        directorio_padre:directorio_padre,
        propietario:propietario
    }).exec();
  

    if(archivo){

        res.json({match:true})

    }else{

        res.json({match:false})

    }
    
}

const renombrarArchivo = async(req,res)=>{

    const { id, nombre, extension } = req.body;

    const renombrar = await Archivos.updateOne({
        _id:Object(id)
    },
    {
        $set:{
            nombre:nombre,
            extension:extension
        }
    }
    ).exec();

    if(renombrar.matchedCount==1){
        res.json({update:true});
    }else{
        res.json({update:false});
    }

}

const moverArchivo = async(req,res)=>{

    const { id, directorio_padre } = req.body;

    const mover = await Archivos.updateOne({
        _id:Object(id)
    },
    {
        $set:{
            directorio_padre:directorio_padre
        }
    }
    ).exec();

    if(mover.matchedCount==1){
        res.json({update:true});
    }else{
        res.json({update:false});
    }

}


module.exports = {
    listarArchivos,
    editarContenido,
    obtenerArchivo,
    renombrarArchivo,
    moverArchivo
}