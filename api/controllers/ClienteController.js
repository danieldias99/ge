const ClienteService = require("./../services/ClienteService");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

class ClienteController {

    constructor(service) {
        this.service = service;
    }

    async getAll(res) {
        this.service.getAll()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

    async insert(req, res) {
        this.service.insert(req.body)
            .then(result => {
                console.log(result);
                res.status(201).json({
                    response: "Registo com sucesso"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

    async getByID(req, res) {
        this.service.getByID(req.body.email)
            .then(doc => {
                console.log(doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: 'Nenhum Utilizador tem esse email!' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

    async update(req, res) {
        this.service.update(req.body)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }

    async signIn(req, res) {
        this.service.signIn(req.body)
            .then(user => {
                if (user) {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        return res.status(401).send({ auth: false, token: null, message: 'Auth failed.' });
                    } else {
                        const payload = { user: user.email };
                        var theToken = jwt.sign(payload, 'TheSecret_123456789', { expiresIn: 86400 });
                        res.json({ success: true, message: 'Token', token: theToken });
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

}

module.exports = new ClienteController(ClienteService);