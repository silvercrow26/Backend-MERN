const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//Middleware funcion que se ejecuta cuando alguien hace una peticion al servidor
//Directorio Público
app.use( express.static('public') );

//Lectura y parseo del body
app.use(express.json());

//Rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});