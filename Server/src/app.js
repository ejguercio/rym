const express = require('express');
const server = express();
const router = require("./routes/index")

server.use(express.json())//middleware que a la info que llega en formato json la pasa a objeto JS para poder trabajar

//PERMISOS CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use("/rickandmorty", router)

module.exports={server};