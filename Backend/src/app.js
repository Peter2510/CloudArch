const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{

     res.json({mess:'Hola desde NodeJs'});

});


module.exports = app;
