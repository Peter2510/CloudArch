const express = require('express');
const UsuariosController = require('../controllers/UsuariosController')

const router = express.Router();

router.post('/login', UsuariosController.obtenerUsuario);
router.get('/empleados', UsuariosController.empleados);
router.post('/agregarUsuario', UsuariosController.agregarUsuario);
router.put('/cambioContrasenia', UsuariosController.cambioContrasenia);

module.exports = router;