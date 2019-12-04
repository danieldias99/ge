const ClienteService = require("./../services/ClienteService");

class ClienteController {

    constructor(service) {
        this.service = service;
    }

    async getAll(res) {
        this.service.getAll(res)
            .then(docs => {
                console.log(docs);
                if (docs.length >= 0) {
                    res.status(200).json(docs);
                } else {
                    res.status(404).json({
                        message: 'No entries found'
                    });
                }
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
        this.service.getByID(req.params.clienteID).then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

}

module.exports = new ClienteController(ClienteService);