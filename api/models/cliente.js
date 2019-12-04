const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    nr_idCivil: Number,
    nr_telemovel: Number,
    metodo_pagamento: String,
    modo_entrega: String,
    morada: String,
    cod_postal: String
});

//clienteSchema.plugin(idvalidator);

module.exports = mongoose.model('Cliente', clienteSchema);