const Cliente = require('./../models/cliente');

class ClienteRepository {

    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return this.model.find({}, { '_id': false });
    }

    async create(toCreate) {
        const cliente = new Cliente({
            nr_idCivil: toCreate.nr_idCivil,
            nome: toCreate.nome,
            email: toCreate.email,
            nr_telemovel: toCreate.nr_telemovel,
            password: toCreate.password,
            metodo_pagamento: toCreate.metodo_pagamento,
            modo_entrega: toCreate.modo_entrega,
            morada: toCreate.morada,
            cod_postal: toCreate.cod_postal,
            isAdmin: toCreate.isAdmin
        });

        cliente.save();
    }

    async getByNr_idCivil(nr_idCivil_toseach) {
        return this.model.find({ nr_idCivil: nr_idCivil_toseach }, { '_id': false });
    }

    async update(nr_idCivil_toseach, body) {
        return this.model.findOneAndUpdate({ nr_idCivil: nr_idCivil_toseach }, { nome: body.nome, email: body.email });
    }

}

module.exports = new ClienteRepository(Cliente);