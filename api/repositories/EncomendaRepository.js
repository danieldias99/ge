const Encomenda = require('./../models/encomenda');

class EncomendaRepository {

    constructor(model) {
        this.model = model;
    }

    async create(toCreate) {
        const encomenda = new Encomenda({
            cliente: toCreate.user,
            produtos: toCreate.produtos,
            data_entrega: toCreate.data_entrega
        });

        console.log(encomenda);
        encomenda.save();
    }

    async getAll() {
        return this.model.find({});
    }

    async getAllCliente(email_tosearch) {
        return this.model.find({ cliente: email_tosearch });
    }

    async getById(id) {
        return this.model.findOne({ _id: id });
    }

    async updateEstado(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, { estado: 'cancelado' });
    }

    async pedidoCancelar(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, { estado: 'A cancelar...' });
    }

    async updateAll(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, {
            produtos: toUpdate.produtos,
            estado: toUpdate.estado,
            data_entrega: toUpdate.data_entrega
        });
    }

}

module.exports = new EncomendaRepository(Encomenda);