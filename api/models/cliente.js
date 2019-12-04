const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clienteSchema = new Schema({
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

module.exports = mongoose.model('Cliente', clienteSchema);