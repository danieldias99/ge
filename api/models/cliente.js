const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    nr_idCivil: Number,
    nome: String,
    email: String,
    nr_telemovel: Number,
    password: String,
    metodo_pagamento: String,
    modo_entrega: String,
    morada: String,
    cod_postal: String,
    isAdmin: Boolean
});

//clienteSchema.plugin(idvalidator);

module.exports = mongoose.model('Cliente', clienteSchema);