const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var client = await connection('users')
                .select("*")
                .where({ "deletedAt": null })
        } catch (err) {
            return { error: err }
        }
        return client;

    },

    async getOneByCPF(cpf) {
        try {
            var client = await connection('users')
            .select("*")
            .where({ "cpf": cpf, "deletedAt": null })
            .first()
        } catch (err) {
            return { error: err }
        }
        console.log(cpf)
        console.log(client)
        return client;
    },

    async getOneByEmail(email) {
        try {
            var client = await connection('users')
                .select("*")
                .where({ "email": email, "deletedAt": null })
                .first()
        } catch (err) {
            return { error: err }
        }
        return client;
    },

    async deleteOneByCPF(cpf) {
        try {
            let data = moment().format();
            var client = await connection('users')
                .update("deletedAt", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "cpf": cpf, "deletedAt": null })

        } catch (err) {
            return { error: err }
        }
    },

    async updateOneByCPF(cpf, atualiza) {
        try {
            var client = await connection('users')
                .where({ "cpf": cpf, "deletedAt": null })
                .update(atualiza)

        } catch (err) {
            return { error: err }
        }
        return client;
    },

    async insert(dados) {
        try {
           await connection('users').insert(dados)
        } catch (err) {
            return { error: err }
        }
    },




}