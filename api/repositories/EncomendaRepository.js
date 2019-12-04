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

    async getAll() {
        return this.model.find({}, { '_id': false, 'produtos._id': false });
    }

    async getAllCliente(nomeCliente_toseach) {
        return this.model.find({ nomeCliente: nomeCliente_toseach }, { '_id': false, 'produtos._id': false });
    }

}

module.exports = new EncomendaRepository(Encomenda);