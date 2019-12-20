const EncomendaService = require("./../services/EncomendaService");
const ClienteService = require("./../services/ClienteService");

class EncomendaController {

    constructor(service) {
        this.service = service;
    }

    async insert(req, res) {
        console.log(req.body);
        this.service.insert(req.body)
            .then(result => {
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
        this.service.getAllCliente(req.body.user)
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

    async getEncomenda(req, res) {
        console.log(req.body._id);
        this.service.getEncomenda(req.body._id)
            .then(doc => {
                console.log(doc);
                if (doc) {
                    res.status(200).json(doc);
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
        this.service.cancelarEncomenda(req.body)
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

    async pedidoCancelarEncomenda(req, res) {
        this.service.pedidoCancelarEncomenda(req.body)
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

    async alterarEncomenda(req, res) {
        this.service.alterarEncomenda(req.body)
            .then(docs => {
                console.log(docs);
                res.status(200).json({
                    response: "Encomenda Atualiazada!"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }

    getProdutosMaisVezesEncomendados(res) {
        return this.service.getProdutosMaisVezesEncomendados()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
}

module.exports = new EncomendaController(EncomendaService);