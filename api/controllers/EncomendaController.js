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
                    for (const enc of docs) {
                        const clienteAss = ClienteService.getByID(enc.nr_idCivil);
                        enc.NomeCliente = clienteAss.nome;
                    }
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
                        message: 'No entries found'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
}

module.exports = new EncomendaController(EncomendaService);