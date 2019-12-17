const Cliente = require('./../models/cliente');
var bcrypt = require('bcrypt');

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
            password: bcrypt.hashSync(toCreate.password, 8),
            metodo_pagamento: toCreate.metodo_pagamento,
            modo_entrega: toCreate.modo_entrega,
            morada: toCreate.morada,
            cod_postal: toCreate.cod_postal,
            isAdmin: toCreate.isAdmin
        });

        cliente.save();
    }

    async getByEmail(email) {
        return this.model.findOne({ email: email }, { '_id': false });
    }

    async signIn(email_toseach) {
        return this.model.findOne({ email: email_toseach }, { '_id': false });
    }

    async update(body) {
        return this.model.findOneAndUpdate({ email: body.user }, { nome: body.nomeNew, email: body.emailNew });
    }

    async updateCliente(body) {
        return this.model.findOneAndUpdate({ email: body.oldEmail }, { nome: body.nomeNew, email: body.emailNew });
    }

}

module.exports = new ClienteRepository(Cliente);