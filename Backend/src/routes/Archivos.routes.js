const express = require('express');
const ArchivosController = require('../controllers/ArchivosController')

const router = express.Router();

router.get('/archivos', ArchivosController.listarArchivos);
router.put('/editar-contenido', ArchivosController.editarContenido);
router.get('/archivo',ArchivosController.obtenerArchivo);
router.put('/renombrar-archivo', ArchivosController.renombrarArchivo);
router.put('/mover-archivo', ArchivosController.moverArchivo);
router.put('/eliminar-archivo', ArchivosController.eliminarArchivo);
router.get('/archivos-papelera', ArchivosController.listarArchivosPapelera);

module.exports = router;