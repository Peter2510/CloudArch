const express = require('express');
const ArchivosController = require('../controllers/ArchivosController')

const router = express.Router();

router.get('/archivos', ArchivosController.listarArchivos);
router.put('/editar-contenido', ArchivosController.editarContenido);
router.get('/archivo',ArchivosController.obtenerArchivo);
router.put('/renombrar-archivo', ArchivosController.renombrarArchivo);
router.put('/mover-archivo', ArchivosController.moverArchivo);


module.exports = router;