const knex = require('knex')
const configuration = require('../../knexfile')

var connection = knex(configuration.development)

//Se a variavel de ambiente do banco da Heroku for ativado 
if (process.env.CLEARDB_DATABASE_URL) {
    connection = knex(configuration.production)
    console.log("Configuração de produção")
}

module.exports = connection