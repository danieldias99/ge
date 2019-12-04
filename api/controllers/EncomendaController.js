const EncomendaService = require("./../services/EncomendaService");
const ClienteService = require("./../services/ClienteService");

class EncomendaController {

    constructor(service) {
        this.service = service;
    }

    async insert(req, res) {
        this.service.insert(req.body)
            .then(result => {
                console.log(result);
                res.status(201).json({
                    response: "Encomenda enviada para preparação!"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
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
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

    async getAllCliente(req, res) {
        this.service.getAllCliente(req.params.clienteID)
            .then(docs => {
                console.log(docs);
                if (docs.length >= 0) {
                    res.status(200).json(docs);
                } else {
                    res.status(404).json({
                        response: 'No entries found'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

    async cancelarEncomenda(req, res) {
        this.service.cancelarEncomenda(req.body.nomeCliente, req.body.data_pedido)
            .then(docs => {
                console.log(docs);
                res.status(200).json({
                    response: "Encomenda Cancelada!"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });

    }
}

module.exports = new EncomendaController(EncomendaService);