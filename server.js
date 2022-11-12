console.log('Hola Server, grupo 32')

//crear una const de tipo express que manejara los hilos de nuestro archivo server.js
const express = require('express')
const app = express();
const port = 3001
const mongoose = require('mongoose')

//crear la conexion hacia la BD
const { stringConn } = require('./db/dbConnection')
mongoose.connect( stringConn );

//importar el modelo del usuario
const User = require('./models/UserModel')

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
//Crear Usuario - Create EndPoint- C
router.post('/createUser', ( req , res ) => {
    const { body } = req
    // const { firstname, lastname, email, password } = body
    const newUser = new User({
        firstname: body.firstname,
        lastname:  body.lastname,
        email:     body.email.toLowerCase(),
        password:  body.password
    })

    // opcion 1 con el async y await, no olvidar colocar async en la funcion
    // const result = await newUser.save();
    // console.log ( result )
    
    // opcion 2 guardando un usuario con el formato tipo promise
    // newUser.save()
    // .then( () => res.send( { message: 'Usuario guardado con éxito' } ) )
    // .catch( (err) => res.send( { message: err } ) )
    
    // opcion 3 guardando un usuario con el formato undefined
    // newUser.save();

    User.findOne( { email: newUser.email }, (err, userFinded) => {
        if(userFinded){
            res.send( { message: 'Usuario ya existe' })
        }else{
            // opcion 4 guardando un usuario con el formato tipo callback
            newUser.save( (err, userStored) => {
                if(userStored){
                    res.send ( { 
                        message: 'Usuario creado con exito',
                    } )
                }
                if(err){
                    res.send( { message: 'Error del servidor' } )
                }
            })
        }
        if(err){
            res.send( { message: 'Error del servidor'})
        }
    } )
})
    //Leer Usuario - Read - R
    //Editar Usuario - Update - U
    //Eliminar Usuario - Delete - D

//enviar la const router para que app la ejecute
app.use('/api/v1',router);

//por medio de la const app activamos la escucha de nuestro server
app.listen(port, () => {
    console.log(`Server Port: ${port}`)
})
