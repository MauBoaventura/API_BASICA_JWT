const jwt = require('jsonwebtoken')
const util = require('../util/uteis')

module.exports = {
    verificacaoJWT(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ msg: "Nenhum Token encontrado" })
        }

        const parts = authHeader.split(' ')

        if (!parts.length === 2) {
            return res.status(401).send({ msg: "Erro de Token" })
        }

        const [scheme, token] = parts

        if (scheme != 'Bearer') {
            return res.status(401).send({ msg: "Tokem malformatado" })
        }

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) return res.status(401).send({ msg: "Tokem malformatado" })

            req.userId = decoded.id;
            return next()
        })
    },

    verificacaoJWT_isVendedor(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ msg: "Nenhum Token encontrado" })
        }

        const parts = authHeader.split(' ')

        if (!parts.length === 2) {
            return res.status(401).send({ msg: "Erro de Token" })
        }

        const [scheme, token] = parts

        if (scheme != 'Bearer') {
            return res.status(401).send({ msg: "Tokem malformatado" })
        }

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({ msg: "Tokem malformatado" })

            if (await util.existe_Vendedor_cpf_cnpj(decoded.id)) {
                req.userId = decoded.id;
                return next()
            } else {
                return res.status(401).send({ msg: "Access Denied" })
            }
        })
    },

    verificacaoJWT_isCliente(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ msg: "Nenhum Token encontrado" })
        }

        const parts = authHeader.split(' ')

        if (!parts.length === 2) {
            return res.status(401).send({ msg: "Erro de Token" })
        }

        const [scheme, token] = parts

        if (scheme != 'Bearer') {
            return res.status(401).send({ msg: "Tokem malformatado" })
        }

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({ msg: "Tokem malformatado" })

            if (await util.existe_Cliente_cpf(decoded.id)) {
                req.userId = decoded.id;
                return next()
            } else {
                return res.status(401).send({ msg: "Access Denied" })
            }
        })
    },

    gerarJWT(params = {}) {
        return jwt.sign(params, process.env.SECRET_JWT, {
            expiresIn: 60000,
        });
    }
}