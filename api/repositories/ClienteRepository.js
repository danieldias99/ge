const Cliente = require('./../models/cliente');
const User = require('./../models/user');

class ClienteRepository {

    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return this.model.find({}, { '_id': false });
    }

    async create(toCreate) {
        const user = new User({
            nome: toCreate.nome,
            email: toCreate.email,
            password: toCreate.password,
            isAdmin: toCreate.isAdmin
        });

        const cliente = new Cliente({
            user: user,
            nr_idCivil: toCreate.nr_idCivil,
            nr_telemovel: toCreate.nr_telemovel,
            metodo_pagamento: toCreate.metodo_pagamento,
            modo_entrega: toCreate.modo_entrega,
            morada: toCreate.morada,
            cod_postal: toCreate.cod_postal
        });

        user.save();

        cliente.save();
    }

    async getByNr_idCivil(nr_idCivil_toseach) {
        return this.model.find({ nr_idCivil: nr_idCivil_toseach }, { '_id': false });
    }
}

module.exports = new ClienteRepository(Cliente);