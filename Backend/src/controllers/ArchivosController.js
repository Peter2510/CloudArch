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

    try {

        const archivo = await Archivos.findOne({
            _id: Object(id)
        });

        const nombreUnico = await crearNombreUnicoEliminar(archivo);

        const nuevoNombre = `${nombreUnico}`

        const eliminar = await Archivos.updateOne({
            _id: Object(id)
        },
            {
                $set: {
                    directorio_padre: "papelera",
                    nombre: nuevoNombre
                }
            }
        ).exec();

        if (eliminar.matchedCount == 1) {
            res.json({ update: true });
        } else {
            res.json({ update: false });
        }

    } catch (error) {

        res.json({ update: false });
    }

}

const eliminarArchivoCompartido = async (req, res) => {

    const { id } = req.body;

    const eliminar = await Archivos.deleteOne({
        _id: Object(id)
    }).exec();


    if (eliminar.deletedCount == 1) {
        res.json({ delete: true });
    } else {
        res.json({ delete: false });
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

async function crearNombreUnico(archivo) {
    let nombreBase = archivo.nombre;
    let contador = 0;
    let nombreExiste = '';

    while (true) {
        const buscar = await Archivos.findOne({
            nombre: `${nombreBase}${nombreExiste}`,
            directorio_padre: archivo.directorio_padre,
            propietario: archivo.propietario
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

async function crearNombreUnicoCompartido(archivo) {
    let nombreBase = archivo.nombre;
    let contador = 0;
    let nombreExiste = '';

    while (true) {
        const buscar = await Archivos.findOne({
            nombre: `${nombreBase}${nombreExiste}`,
            directorio_padre: "compartido",
            propietario: archivo.propietario,
            extension: archivo.extension
        }).exec();

        if (!buscar) {
            // El nombre no existe en la base de datos, es único.
            break;
        }

        // Agregar un sufijo al nombre y seguir buscando.
        contador++;
        nombreExiste = `_compartido_${contador}`;
    }

    return nombreExiste;
}

async function crearNombreUnicoEliminar(archivo) {
    let nombreBase = archivo.nombre;
    let contador = 1;
    let nombreExiste = '';

    while (true) {

        let nombreExiste = `${nombreBase}_${archivo.propietario}_${contador}`;

        const buscar = await Archivos.findOne({
            nombre: `${nombreExiste}`,
            directorio_padre: "papelera",
            extension: archivo.extension
        }).exec();

        if (!buscar) {
            // El nombre no existe en la base de datos, es único.
            return nombreExiste;
        }

        // Agregar un sufijo al nombre y seguir buscando.
        contador++;
    }

    
}

const copiarArchivo = async (req, res) => {

    const id = req.body.id;

    const archivo = await Archivos.findOne({
        _id: id
    }).exec();

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');

    //nombre unico
    const nombreExiste = await crearNombreUnico(archivo);

    const nuevoArchivo = new Archivos({
        nombre: `${archivo.nombre}${nombreExiste}`,
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

    /*const nombreUnico = await crearNombreUnicoCompartido(archivo);*/

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');
    const horaFormateada = fechaActual.toLocaleTimeString('it-IT', { timeZone: 'America/Guatemala' });

    if (archivo) {
        try {
            const usuariosPromises = usuarios.map(async (usuario) => {
                const nuevoArchivo = new Archivos({
                    nombre: `${archivo.nombre}_${fechaFormateada}_${horaFormateada}`,
                    extension: archivo.extension,
                    contenido: archivo.contenido,
                    fecha_creacion: archivo.fecha_creacion,
                    directorio_padre: 'compartido',
                    propietario: archivo.propietario,
                    usuario_compartido: usuario,
                    fecha_compartido: fechaFormateada,
                    hora_compartido: horaFormateada
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
        usuario_compartido: propietario
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
    eliminarArchivoCompartido,
    crearArchivo,
    listarArchivosPapeleraInicio,
    listarArchivosEspecificosPapelera,
    copiarArchivo,
    compartirArchivo,
    listarArchivosCompartidoInicio,
    listarArchivosEspecificosCompartido
}