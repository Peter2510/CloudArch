const express = require('express');
const ArchivosController = require('../controllers/ArchivosController')

const router = express.Router();

router.get('/archivos', ArchivosController.listarArchivos);
router.put('/editar-contenido', ArchivosController.editarContenido);
router.get('/archivo',ArchivosController.obtenerArchivo);
router.put('/renombrar-archivo', ArchivosController.renombrarArchivo);
router.put('/mover-archivo', ArchivosController.moverArchivo);
router.put('/eliminar-archivo', ArchivosController.eliminarArchivo);
router.put('/eliminar-archivo-compartido', ArchivosController.eliminarArchivoCompartido);
router.post('/crear-archivo',ArchivosController.crearArchivo);
router.get('/archivos-papelera-inicio', ArchivosController.listarArchivosPapeleraInicio);
router.get('/archivos-papelera', ArchivosController.listarArchivosEspecificosPapelera);
router.post('/copiar-archivo',ArchivosController.copiarArchivo);
router.post('/compartir-archivo',ArchivosController.compartirArchivo);
router.get('/archivos-compartido-inicio', ArchivosController.listarArchivosCompartidoInicio);
router.get('/archivos-compartido', ArchivosController.listarArchivosEspecificosCompartido);

module.exports = router;