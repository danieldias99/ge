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

    async getAllCliente(nomeCliente_tosearch) {
        return this.model.find({ nomeCliente: nomeCliente_tosearch }, { '_id': false, 'produtos._id': false });
    }

    async updateEstado(nomeCliente_tosearch, data_pedido_tosearch) {
        return this.model.findOneAndUpdate({ nomeCliente: nomeCliente_tosearch, data_pedido: data_pedido_tosearch }, { estado: 'cancelado' });
    }

}

module.exports = new EncomendaRepository(Encomenda);