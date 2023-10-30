const express = require('express');
const DirectoriosController = require('../controllers/DirectoriosController')

const router = express.Router();

router.get('/directorios', DirectoriosController.listarDirectorios);
router.get('/directorio', DirectoriosController.obtenerDirectorio);
router.post('/crear-directorio', DirectoriosController.crearDirectorio);
router.get('/detalles-directorio', DirectoriosController.detallesDirectorio);
router.put('/eliminar-directorio', DirectoriosController.eliminarDirectorio);
router.get('/directorios-papelera-inicio', DirectoriosController.listarDirectoriosPapeleraInicio);
router.get('/directorios-papelera', DirectoriosController.listarDirectoriossEspecificosPapelera);


 

module.exports = router;