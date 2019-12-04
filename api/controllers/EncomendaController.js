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
}

module.exports = new EncomendaController(EncomendaService);