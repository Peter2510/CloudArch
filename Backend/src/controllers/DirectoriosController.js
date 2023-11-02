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

    const { id, propietario } = req.body;

    const dir = await Directorios.findOne({
        _id: id
    }).exec();

    //"eliminar" del root
    const eliminarRoot = await Directorios.updateOne(
        {
            _id: Object(id)
        },
        {
            $set:
            {
                directorio_padre: "papelera"
            }
        }
    ).exec();

    //path del directorio a eliminar
    let path_directorio = '';
    dir.directorio_padre === "/" ? path_directorio = `${dir.directorio_padre}${dir.nombre}` : path_directorio = `${dir.directorio_padre}/${dir.nombre}`

    //Eliminar de padres
    const eliminarPadre = await padres.deleteOne({
        path: path_directorio,
        propietario: propietario
    }).exec();

    const eliminarHijosPadre = await padres.deleteMany({
        path: { $regex: new RegExp(`^${path_directorio}/`) },
        propietario: propietario
    }).exec();

    await moverHijosAPapelera(path_directorio, propietario);

    if (eliminarRoot.matchedCount == 1) {
        res.json({ update: true });
    } else {
        res.json({ update: false });
    }

}

async function moverHijosAPapelera(path_directorio, propietario) {

    const directorios = await Directorios.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });


    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (directorios.length > 0 || archivos.length > 0) {

        archivos.forEach(async (archivo) => {

            await Archivos.updateMany(
                {
                    directorio_padre: path_directorio,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: "papelera" + path_directorio }
                }
            )

        });


        directorios.forEach(async (hijo) => {

            //"eliminar" anidado

            await Directorios.updateMany(
                {
                    directorio_padre: path_directorio,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: "papelera" + path_directorio }
                }).exec();

            let path_directorioAux = '';
            path_directorio = path_directorioAux = `${hijo.directorio_padre}/${hijo.nombre}`

            moverHijosAPapelera(path_directorioAux, propietario);

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

    const { id } = req.body;

    try {

        const dir = await Directorios.findOne({
            _id: id
        }).exec();

        let path_directorio = '';
        dir.directorio_padre === "/" ? path_directorio = `${dir.directorio_padre}${dir.nombre}` : path_directorio = `${dir.directorio_padre}/${dir.nombre}`;
        let propietario = dir.propietario;

        //copiar directorio padre

        //validar si existe un directorio con el mismo nombre

        const nombreExiste = await crearNombreUnico(dir);


        //crear directorio padre

        const nuevoDirectorio = new Directorios({
            nombre: `${dir.nombre}${nombreExiste}`,
            fecha_creacion: dir.fecha_creacion,
            directorio_padre: dir.directorio_padre,
            propietario: dir.propietario
        });

        const resultado = await nuevoDirectorio.save();

        // "Agregar" del root
        const padre = new padres({
            path: `${path_directorio}${nombreExiste}`,
            propietario: dir.propietario
        }).save();


        //copiar directorios anidados

        await copiarHijos(path_directorio, propietario, nombreExiste);

        res.json({ copiado: true });

    } catch (error) {

        res.json({ copiado: true });

    }

}


async function copiarHijos(path_directorio, propietario, nuevoNombre) {

    const hijos = await Directorios.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (hijos.length > 0 || archivos.length > 0) {

        archivos.forEach(async (archivo) => {

            //crear copia del archivo encontrado

            const nuevoArchivo = new Archivos({
                nombre: archivo.nombre,
                extension: archivo.extension,
                contenido: archivo.contenido,
                fecha_creacion: archivo.fecha_creacion,
                directorio_padre: `${archivo.directorio_padre}${nuevoNombre}`,
                propietario: archivo.propietario
            });

            const resultado = await nuevoArchivo.save();

        });

        hijos.forEach(async (hijo) => {

            //"copiar" anidado

            const nuevoDirectorio = new Directorios({
                nombre: `${hijo.nombre}`,
                fecha_creacion: hijo.fecha_creacion,
                directorio_padre: `${hijo.directorio_padre}${nuevoNombre}`,
                propietario: hijo.propietario
            });

            const resultado = await nuevoDirectorio.save();

            let directorio_p = nuevoDirectorio.directorio_padre;

            const padre = new padres({
                path: `${directorio_p}`,
                propietario: propietario
            }).save();


            let path_directorioAux = '';
            path_directorioAux = `${hijo.directorio_padre}/${hijo.nombre}`

            copiarHijos(path_directorioAux, propietario, nuevoNombre);

        });

    } else {

    }

}







const moverDirectorio = async (req, res) => {

    try {
        const { id, nuevo_directorio_padre } = req.body;

        const dir = await Directorios.findOne({
            _id: id
        }).exec();

        //path del directorio a mover
        let path_directorio = '';
        dir.directorio_padre === "/" ? path_directorio = `${dir.directorio_padre}${dir.nombre}` : path_directorio = `${dir.directorio_padre}/${dir.nombre}`

        //Eliminar de padres
        const eliminarPadre = await padres.deleteOne({
            path: path_directorio,
            propietario: dir.propietario
        }).exec();

        const eliminarHijosPadre = await padres.deleteMany({
            path: { $regex: new RegExp(`^${path_directorio}/`) },
            propietario: dir.propietario
        }).exec();

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

        moverHijosDirectorio(path_directorio, dir.propietario,nuevo_directorio_padre);

        res.json({ update: true });

    } catch (error) {
        res.json({ update: false });
    }



}

async function moverHijosDirectorio(path_directorio, propietario, nuevo_directorio_padre) {

    const directorios = await Directorios.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (directorios.length > 0 || archivos.length > 0) {

        archivos.forEach(async (archivo) => {

            await Archivos.updateMany(
                {
                    directorio_padre: path_directorio,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: `${nuevo_directorio_padre}${path_directorio}` }
                }
            )

        });


        directorios.forEach(async (hijo) => {

            //"eliminar" anidado

            await Directorios.updateMany(
                {
                    directorio_padre: path_directorio,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: `${nuevo_directorio_padre}${path_directorio}` }
                }).exec();

            await new padres({
                path: `${nuevo_directorio_padre}${hijo.directorio_padre}/${hijo.nombre}`,
                propietario: propietario
            }).save();

            let path_directorioAux = `${hijo.directorio_padre}/${hijo.nombre}`
            let nuevo_directorio_padre_aux = `${nuevo_directorio_padre}`

            moverHijosDirectorio(path_directorioAux, propietario, nuevo_directorio_padre_aux);

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