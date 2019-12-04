const Encomenda = require('./../models/encomenda');

class EncomendaRepository {

    constructor(model) {
        this.model = model;
    }

    async create(toCreate) {
        const encomenda = new Encomenda({
            nomeCliente: toCreate.nomeCliente,
            produtos: toCreate.produtos,
            data_entrega: toCreate.data_entrega
        });
        encomenda.save();
    }

}

module.exports = new EncomendaRepository(Encomenda);