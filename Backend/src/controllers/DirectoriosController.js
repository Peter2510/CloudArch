const Directorios = require('../models/Directorio');
const padres = require('../models/Padres');
const Archivos = require('../models/Archivos');

const listarDirectorios = async (req, res) => {

    const usuario = req.query.usuario;
    const directorio = req.query.directorio_padre;
    const directorioContenido = await Directorios.find({
        propietario: usuario,
        directorio_padre: directorio

    }).exec();

    res.json(directorioContenido);

}


const obtenerDirectorio = async (req, res) => {

    const nombre = req.query.nombre;
    const directorio_padre = req.query.directorio_padre;
    const propietario = req.query.propietario;
    const directorio = await Directorios.findOne({
        nombre: nombre,
        directorio_padre: directorio_padre,
        propietario: propietario
    }).exec();

    if (directorio) {
        res.json({ match: true })
    } else {
        res.json({ match: false })
    }

}

const crearDirectorio = async (req, res) => {

    const nombre = req.body.nombre;
    const directorio_padre = req.body.directorio_padre;
    const propietario = req.body.propietario;

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');

    const nuevoDirectorio = new Directorios({
        nombre: nombre,
        fecha_creacion: fechaFormateada,
        directorio_padre: directorio_padre,
        propietario: propietario
    });

    try {
        const resultado = await nuevoDirectorio.save();

        let directorio_p = nuevoDirectorio.directorio_padre;

        directorio_p == '/' ? directorio_p = `/${nombre}` : directorio_p = `${directorio_padre}/${nombre}`;

        const padre = new padres({
            path: `${directorio_p}`,
            propietario: propietario
        }).save();

        res.json({ insertado: true });
    } catch (error) {

        res.json({ insertado: false });
    }

}

const detallesDirectorio = async (req, res) => {

    const _id = req.query._id;

    const directorio = await Directorios.findOne({
        _id: _id
    }).exec();

    if (directorio) {
        res.json(directorio);
    } else {
        res.json('')
    }

}

const eliminarDirectorio = async (req, res) => {

    try {


        const { id } = req.body;

        let nuevo_directorio_padre = "papelera";

        const directorio_padre_a_mover = await Directorios.findOne({
            _id: id
        }).exec();

        let path_padre_antiguo = `${directorio_padre_a_mover.directorio_padre}/${directorio_padre_a_mover.nombre}`;

        //path del directorio a mover
        let path_directorio = '';
        directorio_padre_a_mover.directorio_padre === "/" ? path_directorio = `${directorio_padre_a_mover.directorio_padre}${directorio_padre_a_mover.nombre}` : path_directorio = `${directorio_padre_a_mover.directorio_padre}/${directorio_padre_a_mover.nombre}`

        //Eliminar de padres
        const eliminarPadre = await padres.deleteOne({
            path: path_directorio,
            propietario: directorio_padre_a_mover.propietario
        }).exec();

        const eliminarHijosPadre = await padres.deleteMany({
            path: { $regex: new RegExp(`^${path_directorio}/`) },
            propietario: directorio_padre_a_mover.propietario
        }).exec();

        //Agregar nuevo path a padres


        //mover carpeta root
        const moverRoot = await Directorios.updateOne(
            {
                _id: Object(id)
            },
            {
                $set:
                {
                    directorio_padre: nuevo_directorio_padre
                }
            }
        ).exec();

        let aux_nuevo_directorio_padre = `${nuevo_directorio_padre}/${directorio_padre_a_mover.nombre}`

        //mover hijos
        await moverHijosAPapelera(path_padre_antiguo,directorio_padre_a_mover.propietario,aux_nuevo_directorio_padre);

        res.json({ update: true });
        

    } catch (error) {
        res.json({ update: false });
        console.error(error)
    }



}

async function moverHijosAPapelera(path, propietario, nuevo_directorio) {

    const path_antiguo = path.replace(/\/\//g, '/');
                             
    const nuevo_directorio_padre = nuevo_directorio.replace(/\/\//g, '/');

    //console.log("Mover de",path_antiguo, "a", nuevo_directorio_padre)

    const directorios = await Directorios.find({
        directorio_padre: path_antiguo,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_antiguo,
        propietario: propietario
    });

    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (directorios.length > 0 || archivos.length > 0) {

        archivos.forEach(async (archivo) => {

            await Archivos.updateMany(
                {
                    directorio_padre: path_antiguo,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: `${nuevo_directorio_padre}` }
                }
            )

        });


        directorios.forEach(async (hijo) => {

            //"eliminar" anidado

            await Directorios.updateMany(
                {
                    directorio_padre: path_antiguo,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: `${nuevo_directorio_padre}`}
                }).exec();


            let path_antiguo_aux = `${hijo.directorio_padre}/${hijo.nombre}`
            let nuevo_directorio_padre_aux = `${nuevo_directorio_padre}/${hijo.nombre}`

            await  moverHijosDirectorio(path_antiguo_aux, propietario, nuevo_directorio_padre_aux);

        });


    } else {

    }

}

const listarDirectoriosPapeleraInicio = async (req, res) => {

    const directorio = req.query.directorio_padre;

    const papelera = await Directorios.find({
        directorio_padre: directorio
    }).exec();

    res.json(papelera);

}

//navegacion entre carpetas en la papelera
const listarDirectoriossEspecificosPapelera = async (req, res) => {

    const directorio = req.query.directorio_padre;
    const propietario = req.query.propietario;
    const directorioContenido = await Directorios.find({
        directorio_padre: directorio,
        propietario: propietario
    }).exec();

    res.json(directorioContenido);

}

//copiar directorio

async function crearNombreUnico(dir) {
    let nombreBase = dir.nombre;
    let contador = 0;
    let nombreExiste = '';

    while (true) {
        const buscar = await Directorios.findOne({
            nombre: `${nombreBase}${nombreExiste}`,
            directorio_padre: dir.directorio_padre,
            propietario: dir.propietario
        }).exec();

        if (!buscar) {
            // El nombre no existe en la base de datos, es único.
            break;
        }

        // Agregar un sufijo al nombre y seguir buscando.
        contador++;
        nombreExiste = `_copia_${contador}`;
    }

    return nombreExiste;
}

const copiarDirectorio = async (req, res) => {

    try {


        const { id } = req.body;

        const directorio = await Directorios.findOne({
            _id: id
        }).exec();


        //path del directorio a copiar
        let path_directorio = '';
        directorio.directorio_padre === "/" ? path_directorio = `${directorio.directorio_padre}${directorio.nombre}` : path_directorio = `${directorio.directorio_padre}/${directorio.nombre}`

        //nombre unico
        const nombreExiste = await crearNombreUnico(directorio);


        //crear directorio padre

        const nuevoDirectorio = new Directorios({
            nombre: `${directorio.nombre}${nombreExiste}`,
            fecha_creacion: directorio.fecha_creacion,
            directorio_padre: directorio.directorio_padre,
            propietario: directorio.propietario
        });

        await nuevoDirectorio.save();
        
        //agregar a padres
       
        // "Agregar" al root
        
        const padre = new padres({
            path: `${path_directorio}${nombreExiste}`,
            propietario: directorio.propietario    
        }).save();


        let nuevo_directorio_padre = `${directorio.directorio_padre}/${directorio.nombre}${nombreExiste}`

        //mover hijos
        await copiarHijos(path_directorio,directorio.propietario,nuevo_directorio_padre);

        
        res.json({ copiado: true });
        

    } catch (error) {
        res.json({ copiado: false });
        console.error(error)
    }


}


async function copiarHijos(path, propietario, nuevo_directorio) {

    const path_antiguo = path.replace(/\/\//g, '/');
                             
    const nuevo_directorio_padre = nuevo_directorio.replace(/\/\//g, '/');

    //console.log("Mover de",path_antiguo, "a", nuevo_directorio_padre)

    const directorios = await Directorios.find({
        directorio_padre: path_antiguo,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_antiguo,
        propietario: propietario
    });

    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (directorios.length > 0 || archivos.length > 0) {

        archivos.forEach(async (archivo) => {

            const nuevoArchivo = new Archivos({
                nombre: archivo.nombre,
                extension: archivo.extension,
                contenido: archivo.contenido,
                fecha_creacion: archivo.fecha_creacion,
                directorio_padre: `${nuevo_directorio_padre}`,
                propietario: archivo.propietario
            });

            const resultado = await nuevoArchivo.save();

        });


        directorios.forEach(async (hijo) => {

            
            //"copiar" anidado

            const nuevoDirectorio = new Directorios({
                nombre: `${hijo.nombre}`,
                fecha_creacion: hijo.fecha_creacion,
                directorio_padre: `${nuevo_directorio_padre}`,
                propietario: hijo.propietario
            });

            await nuevoDirectorio.save();

            //crear padre
            const padre = new padres({
                path: `${nuevo_directorio_padre}/${hijo.nombre}`,
                propietario: propietario
            }).save();


            let path_antiguo_aux = `${hijo.directorio_padre}/${hijo.nombre}`
            let nuevo_directorio_padre_aux = `${nuevo_directorio_padre}/${hijo.nombre}`

            await  copiarHijos(path_antiguo_aux, propietario, nuevo_directorio_padre_aux);

        });


    } else {

    }

}


const moverDirectorio = async (req, res) => {

    try {


        const { id, nuevo_directorio_padre } = req.body;

        const directorio_padre_a_mover = await Directorios.findOne({
            _id: id
        }).exec();

        let path_padre_antiguo = `${directorio_padre_a_mover.directorio_padre}/${directorio_padre_a_mover.nombre}`;

        //path del directorio a mover
        let path_directorio = '';
        directorio_padre_a_mover.directorio_padre === "/" ? path_directorio = `${directorio_padre_a_mover.directorio_padre}${directorio_padre_a_mover.nombre}` : path_directorio = `${directorio_padre_a_mover.directorio_padre}/${directorio_padre_a_mover.nombre}`

        //Eliminar de padres
        const eliminarPadre = await padres.deleteOne({
            path: path_directorio,
            propietario: directorio_padre_a_mover.propietario
        }).exec();

        const eliminarHijosPadre = await padres.deleteMany({
            path: { $regex: new RegExp(`^${path_directorio}/`) },
            propietario: directorio_padre_a_mover.propietario
        }).exec();

        //Agregar nuevo path a padres

        if(nuevo_directorio_padre=="/"){

            const padre = new padres({
                path:  `/${directorio_padre_a_mover.nombre}`,
                propietario: directorio_padre_a_mover.propietario
            }).save();

        }else{
            
            const padre = new padres({
                path:  `${nuevo_directorio_padre}/${directorio_padre_a_mover.nombre}`,
                propietario: directorio_padre_a_mover.propietario
            }).save();
        }
        


        //mover carpeta root
        const moverRoot = await Directorios.updateOne(
            {
                _id: Object(id)
            },
            {
                $set:
                {
                    directorio_padre: nuevo_directorio_padre
                }
            }
        ).exec();

        let aux_nuevo_directorio_padre = `${nuevo_directorio_padre}/${directorio_padre_a_mover.nombre}`

        //mover hijos
        await moverHijosDirectorio(path_padre_antiguo,directorio_padre_a_mover.propietario,aux_nuevo_directorio_padre);

        res.json({ update: true });
        

    } catch (error) {
        res.json({ update: false });
        console.error(error)
    }



}

async function moverHijosDirectorio(path, propietario, nuevo_directorio) {

    const path_antiguo = path.replace(/\/\//g, '/');
                             
    const nuevo_directorio_padre = nuevo_directorio.replace(/\/\//g, '/');

    //console.log("Mover de",path_antiguo, "a", nuevo_directorio_padre)

    const directorios = await Directorios.find({
        directorio_padre: path_antiguo,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_antiguo,
        propietario: propietario
    });

    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (directorios.length > 0 || archivos.length > 0) {

        archivos.forEach(async (archivo) => {

            await Archivos.updateMany(
                {
                    directorio_padre: path_antiguo,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: `${nuevo_directorio_padre}` }
                }
            )

        });


        directorios.forEach(async (hijo) => {

            //"eliminar" anidado

            await Directorios.updateMany(
                {
                    directorio_padre: path_antiguo,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: `${nuevo_directorio_padre}`}
                }).exec();

            await new padres({
                path: `${nuevo_directorio_padre}/${hijo.nombre}`,
                propietario: propietario
            }).save();

            let path_antiguo_aux = `${hijo.directorio_padre}/${hijo.nombre}`
            let nuevo_directorio_padre_aux = `${nuevo_directorio_padre}/${hijo.nombre}`

            await  moverHijosDirectorio(path_antiguo_aux, propietario, nuevo_directorio_padre_aux);

        });


    } else {

    }

}







module.exports = {
    listarDirectorios,
    obtenerDirectorio,
    crearDirectorio,
    detallesDirectorio,
    eliminarDirectorio,
    listarDirectoriosPapeleraInicio,
    listarDirectoriossEspecificosPapelera,
    copiarDirectorio,
    moverDirectorio
}