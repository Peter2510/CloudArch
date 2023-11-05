const express = require('express');
const padres = require('../controllers/PadresController')

const router = express.Router();

router.get('/directorios-usuario', padres.listarDirectoriosPadre);
router.get('/directorios-usuario-excluyente', padres.listarDirectoriosPadreMover);



 

module.exports = router;