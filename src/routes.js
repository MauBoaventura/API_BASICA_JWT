const express = require('express')
const routes = express.Router()
const authentication = require('./util/authentication')

const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')

//Login
routes.post('/login', LoginController.login)

// Usuarios
routes.get('/user', UserController.index)
routes.get('/user/:cpf', UserController.get)
routes.post('/user', UserController.cadastro)
routes.put('/user/:cpf', authentication.verificacaoJWT, UserController.update)
routes.delete('/user/:cpf', authentication.verificacaoJWT, UserController.delete)



module.exports = routes