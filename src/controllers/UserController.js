const connection = require('../database/connection')
const util = require('../util/uteis')
const DAOUser = require('../database/DAO/DAOUser')

module.exports = {
    async index(req, res) {

        const client = await DAOUser.getAll()

        res.json(client)
    },
    async get(req, res) {
        const cpf = req.params.cpf;
        //Verifica se o cpf existe
        if (await DAOUser.getOneByCPF(cpf) == undefined) {
            return res.status(401).json({
                error: "Client do not exist!"
            })
        }
        let client= await DAOUser.getOneByCPF(cpf);
        res.json(client)
    },

    async login(req, res) {
        const cpf = req.params.cpf;

        const client = await DAOUser.getOneByCPF(cpf)
        if (client == undefined)
            return res.status(401).json({
                error: "Client do not exist"
            })
        res.json(client)
    },

    async cadastro(req, res) {
        const cpf = req.body.cpf;
        const email = req.body.email;

        //Verifica se o cpf já esta sendo utilizado
        if (await DAOUser.getOneByCPF(cpf) != undefined) {
            return res.status(401).json({
                error: "Cpf already used!"
            })
        }

        //Verifica se o email já esta sendo utilizado
        if (await DAOUser.getOneByEmail(email) != undefined) {
            return res.status(401).json({
                error: "Email already used!"
            })
        }

        //Insere no banco
        try {
            req.body.password = await util.criptografar(req.body.password)
            await DAOUser.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const clienteheader = req.userId;
        const cpf = req.params.cpf;
        if (clienteheader == cpf) {
            //Verifica se o cpf existe
            if (await DAOUser.getOneByCPF(cpf) == undefined) {
                return res.status(401).json({
                    error: "Client do not exist!"
                })
            }
            await DAOUser.deleteOneByCPF(cpf);

            res.status(204).send()

        } else {
            return res.status(401).json({
                error: "Access Denied!"
            })
        }

    },

    async update(req, res) {
        const clienteheader = req.userId;
        const cpf = req.params.cpf;

        if (clienteheader == cpf) {
            const client = await DAOUser.getOneByCPF(cpf)

            //Verifica se o cpf já esta sendo utilizado
            if (await DAOUser.getOneByCPF(cpf) == undefined) {
                return res.status(401).json({
                    error: "Client do not exist!"
                })
            }

            if (req.body.cpf != clienteheader)
                //Verifica se o cpf novo já esta sendo utilizado
                if (await DAOUser.getOneByCPF(req.body.cpf) != undefined) {
                    return res.status(401).json({
                        error: "New CPF already used!"
                    })
                }

            if (client.email != req.body.email) {
                //Verifica se o email novo já esta sendo utilizado
                if (await util.existe_Cliente_email(req.body.email)) {
                    return res.status(401).json({
                        error: "New email already used!"
                    })
                }
            }
            req.body.password = await util.criptografar(req.body.password)
            await DAOUser.updateOneByCPF(cpf, req.body)

            return res.status(200).send()
        } else {
            return res.status(401).json({
                error: "Access Denied!"
            })
        }

    }
};