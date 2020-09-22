const moment = require('moment')

const connection = require('../database/connection')
const crypto = require('crypto')
const encrypted_Key = process.env.SECRET_PASSWORD

module.exports = {
    async existe_cpf_cnpj(cpf_cnpj) {
        const sellers = await connection('sellers')
            .select("*")
            .where({ "cpf_cnpj": cpf_cnpj, "deletedAt": null })
            .first()

        const users = await connection('users')
            .select("*")
            .where({ "cpf": cpf_cnpj, "deletedAt": null })
            .first()

        //Se não existir cpf cadastrados retorna false
        if (sellers == undefined && users == undefined)
            return false

        return true;
    },

    async existe_Vendedor_cpf_cnpj(cpf_cnpj) {
        const sellers = await connection('sellers')
            .select("*")
            .where({ "cpf_cnpj": cpf_cnpj, "deletedAt": null })
            .first()
        if (sellers == undefined)
            return false

        return true;

    },

    async existe_Cliente_cpf(cpf_cnpj) {
        try {
            const users = await connection('users')
                .select("*")
                .where({ "cpf": cpf_cnpj, "deletedAt": null })
                .first()

            if (users == undefined) {
                return false
            }
            return true;
        
        } catch (error) {
            throw error
            // return false
        }

    },

    async existe_Vendedor_email(email) {
        const sellers = await connection('sellers')
            .select("*")
            .where({ "email": email, "deletedAt": null })
            .first()
        if (sellers == undefined)
            return false

        return true;
    },

    async existe_Cliente_email(email) {
        const client = await connection('users')
            .select("*")
            .where({"email": email, "deletedAt":null})
            .first()
        if (client == undefined)
            return false

        return true;
    },

    async criptografar(senha) {
        try {
            const cipher = crypto.createCipheriv("aes-192-ecb", Buffer.from(encrypted_Key, "base64"), null);
            const encryptedSecret = cipher.update(senha, "utf8", "base64") + cipher.final("base64");
            return encryptedSecret;
        } catch (error) {
            return error
        }
    },

    descriptografar(senha) {
        const decipher = crypto.createDecipheriv("aes-192-ecb", Buffer.from(encrypted_Key, "base64"), null);
        const decryptedSecret = decipher.update(senha, "base64", "utf8") + decipher.final("utf8");
        return decryptedSecret;
    }
}

