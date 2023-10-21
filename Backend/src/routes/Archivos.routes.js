const express = require('express');
const ArchivosController = require('../controllers/ArchivosController')

const router = express.Router();

router.get('/archivos', ArchivosController.listarArchivos);
router.post('/editar-contenido', ArchivosController.editarContenido);


module.exports = router;