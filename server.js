console.log('Hola Server, grupo 32')

//crear una const de tipo express que manejara los hilos de nuestro archivo server.js
const express = require('express')
const app = express();
const port = 3001
const mongoose = require('mongoose')

//crear la conexion hacia la BD
const { stringConn } = require('./db/dbConnection')
mongoose.connect( stringConn );

//Creamos el parserBody de las peticiones HTTP
app.use( express.urlencoded( {extended: true} ) )
app.use( express.json() )

//creacion del objeto de rutas para los End Points
const router = express.Router();

//Ruta de prueba
router.get("/", ( req , res ) => { 
    res.send( '<h1>Hello World!!!! My First API Rest</h1>' )
})

//Operaciones CRUD......ToDo
    //Crear Usuario - Create - C
    //Leer Usuario - Read - R
    //Editar Usuario - Update - U
    //Eliminar Usuario - Delete - D

//enviar la const router para que app la ejecute
app.use(router);

//por medio de la const app activamos la escucha de nuestro server
app.listen(port, () => {
    console.log(`Server Port: ${port}`)
})
