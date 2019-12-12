const Encomenda = require('./../models/encomenda');

class EncomendaRepository {

    constructor(model) {
        this.model = model;
    }

    async create(toCreate) {
        const encomenda = new Encomenda({
            cliente: toCreate.cliente,
            produtos: toCreate.produtos,
            data_entrega: toCreate.data_entrega
        });
        encomenda.save();
    }

    async getAll() {
        return this.model.find({}, { 'produtos._id': false });
    }

    async getAllCliente(email_tosearch) {
        return this.model.find({ cliente: email_tosearch }, { 'produtos._id': false });
    }

    async updateEstado(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, { estado: 'cancelado' });
    }

    async updateAll(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, {
            produtos: toUpdate.produtos,
            data_entrega: toUpdate.data_entrega
        });
    }

}

module.exports = new EncomendaRepository(Encomenda);