const util = require('../util/uteis')
const authentication = require('../util/authentication')
const DAOUser = require('../database/DAO/DAOUser');

module.exports = {
    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const client = await DAOUser.getOneByEmail(email)

        if (client == undefined)
            return res.status(401).json({
                error: "Cliente não cadastrado"
            })

        if (util.descriptografar(client.password) != password)
            return res.status(401).json({
                error: "Senha incorreta"
            })

        delete client.password

        return res.status(200).json({
            token: authentication.gerarJWT({ id: client.cpf }),
        })
    },

    async logout(req, res) {

    }
}