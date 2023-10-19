const app = require('./app');
const {startDB} = require('./configs/database.configs');
require('dotenv').config();
startDB();

const PORT = process.env.PORTAPP;

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})