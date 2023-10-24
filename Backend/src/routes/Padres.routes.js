const express = require('express');
const padres = require('../controllers/PadresController')

const router = express.Router();

router.get('/directorios-usuario', padres.listarDirectoriosPadre);
 

module.exports = router;