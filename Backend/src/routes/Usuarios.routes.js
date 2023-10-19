const express = require('express');
const Usuario = require('../models/Usuario');
const LibrosController = require('../controllers/UsuariosController')

const router = express.Router();

router.get('/usuario', LibrosController.obtenerUsuario);
router.post('/agregarUsuario', LibrosController.agregarUsuario);
router.put('/cambioContrasenia', LibrosController.cambioContrasenia);

module.exports = router;