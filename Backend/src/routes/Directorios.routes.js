const express = require('express');
const DirectoriosController = require('../controllers/DirectoriosController')

const router = express.Router();

router.get('/directorios', DirectoriosController.listarDirectorios);
 

module.exports = router;