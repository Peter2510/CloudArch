const mongoose = require('mongoose')
require ('dotenv').config();

async function startDB(){

    try {
        const HOST = process.env.HOSTD || process.env.HOSTL;
        const URL = `mongodb://${HOST}:${process.env.PORTDB}/${process.env.DATABASE}`;
        const db = await mongoose.connect( URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log(`Conectado a la base de datos ${process.env.DATABASE}`);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    startDB
}