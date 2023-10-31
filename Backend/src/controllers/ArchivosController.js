const Archivos = require('../models/Archivos')

const listarArchivos = async (req, res) => {

    const usuario = req.query.usuario;
    const directorio = req.query.directorio_padre;

    const archivos = await Archivos.find({
        propietario: usuario,
        directorio_padre: directorio

    }).exec();

    res.json(archivos);

}

const editarContenido = async (req, res) => {

    const { _id, contenido } = req.body;

    const edicion = await Archivos.updateOne({
        _id: Object(_id)
    },
        {
            $set: {
                contenido: contenido
            }
        }
    ).exec();

    if (edicion.matchedCount == 1) {
        res.json({ update: true });
    } else {
        res.json({ update: false });
    }

}

const obtenerArchivo = async (req, res) => {

    const nombre = req.query.nombre;
    const extension = req.query.extension;
    const directorio_padre = req.query.directorio_padre;
    const propietario = req.query.propietario;

    const archivo = await Archivos.findOne({
        nombre: nombre,
        extension: extension,
        directorio_padre: directorio_padre,
        propietario: propietario
    }).exec();


    if (archivo) {

        res.json({ match: true })

    } else {

        res.json({ match: false })

    }

}

const renombrarArchivo = async (req, res) => {

    const { id, nombre, extension } = req.body;

    const renombrar = await Archivos.updateOne({
        _id: Object(id)
    },
        {
            $set: {
                nombre: nombre,
                extension: extension
            }
        }
    ).exec();

    if (renombrar.matchedCount == 1) {
        res.json({ update: true });
    } else {
        res.json({ update: false });
    }

}

const moverArchivo = async (req, res) => {

    const { id, directorio_padre } = req.body;

    const mover = await Archivos.updateOne({
        _id: Object(id)
    },
        {
            $set: {
                directorio_padre: directorio_padre
            }
        }
    ).exec();


    if (mover.matchedCount == 1) {
        res.json({ update: true });
    } else {
        res.json({ update: false });
    }

}


const eliminarArchivo = async (req, res) => {

    const { id } = req.body;

    const eliminar = await Archivos.updateOne({
        _id: Object(id)
    },
        {
            $set: {
                directorio_padre: "papelera"
            }
        }
    ).exec();


    if (eliminar.matchedCount == 1) {
        res.json({ update: true });
    } else {
        res.json({ update: false });
    }

}

const crearArchivo = async (req, res) => {

    const nombre = req.body.nombre;
    const extension = req.body.extension;
    const contenido = req.body.contenido;
    const directorio_padre = req.body.directorio_padre;
    const propietario = req.body.propietario;

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');

    const nuevoArchivo = new Archivos({
        nombre: nombre,
        extension: extension,
        contenido: contenido,
        fecha_creacion: fechaFormateada,
        directorio_padre: directorio_padre,
        propietario: propietario
    });

    try {
        const resultado = await nuevoArchivo.save();
        res.json({ insertado: true });
    } catch (error) {
        res.json({ insertado: false });
    }

}

const copiarArchivo = async (req, res) => {

    const id = req.body.id;

    const archivo = await Archivos.findOne({
        _id: id
    }).exec();

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');

    const nuevoArchivo = new Archivos({
        nombre: `${archivo.nombre}-Copia`,
        extension: archivo.extension,
        contenido: archivo.contenido,
        fecha_creacion: fechaFormateada,
        directorio_padre: archivo.directorio_padre,
        propietario: archivo.propietario
    });

    try {
        const resultado = await nuevoArchivo.save();
        res.json({ insertado: true });
    } catch (error) {
        res.json({ insertado: false });
    }

}

const listarArchivosPapeleraInicio = async (req, res) => {

    const directorio = req.query.directorio_padre;

    const papelera = await Archivos.find({
        directorio_padre: directorio,
    }).exec();

    res.json(papelera);

}

const listarArchivosEspecificosPapelera = async (req, res) => {

    const directorio = req.query.directorio_padre;
    const propietario = req.query.propietario;

    const papelera = await Archivos.find({
        directorio_padre: directorio,
        propietario: propietario
    }).exec();

    res.json(papelera);

}

const compartirArchivo = async (req, res) => {

    const usuarios = req.body.usuarios;
    const id_archivo = req.body.id;

    const archivo = await Archivos.findOne({
        _id: id_archivo
    }).exec();

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');
    const horaFormateada = fechaActual.toLocaleTimeString('it-IT',{ timeZone: 'America/Guatemala' });

    if (archivo) {
        try {
            const usuariosPromises = usuarios.map(async (usuario) => {
                const nuevoArchivo = new Archivos({
                    nombre: archivo.nombre,
                    extension: archivo.extension,
                    contenido: archivo.contenido,
                    fecha_creacion: archivo.fecha_creacion,
                    directorio_padre: 'compartido',
                    propietario: archivo.propietario,
                    fecha_compartido:fechaFormateada,
                    hora_compartido:horaFormateada
                });

                return nuevoArchivo.save();
            });

            await Promise.all(usuariosPromises);

            res.json({ share: true });
        } catch (error) {
            res.json({ error: true });
        }
    } else {
        res.json({ share: false });
    }

}

const listarArchivosCompartidoInicio = async (req, res) => {

    const directorio = req.query.directorio_padre;
    const propietario = req.query.propietario;
   
    const compartido = await Archivos.find({
        directorio_padre: directorio,
        propietario:propietario
    }).exec();

    res.json(compartido);

}

const listarArchivosEspecificosCompartido = async (req, res) => {

    const directorio = req.query.directorio_padre;
    const propietario = req.query.propietario;

    const compartido = await Archivos.find({
        directorio_padre: directorio,
        propietario: propietario
    }).exec();


    res.json(compartido);

}


module.exports = {
    listarArchivos,
    editarContenido,
    obtenerArchivo,
    renombrarArchivo,
    moverArchivo,
    eliminarArchivo,
    crearArchivo,
    listarArchivosPapeleraInicio,
    listarArchivosEspecificosPapelera,
    copiarArchivo,
    compartirArchivo,
    listarArchivosCompartidoInicio,
    listarArchivosEspecificosCompartido
}