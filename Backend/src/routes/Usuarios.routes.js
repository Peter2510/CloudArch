const express = require('express');
const UsuariosController = require('../controllers/UsuariosController')

const router = express.Router();

router.post('/login', UsuariosController.login);
router.get('/empleados', UsuariosController.empleados);
router.post('/agregar-usuario', UsuariosController.agregarUsuario);
router.put('/actualizar-contrasenia', UsuariosController.cambioContrasenia);


module.exports = router;