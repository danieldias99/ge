const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const encomendaSchema = new Schema({
    cliente: String,
    produtos: [
        {
            nomeProduto: String,
            quantidade: String
        }
    ],
    data_entrega: String,
    estado: { type: String, default: 'Em espera...' }
});

module.exports = mongoose.model('Encomenda', encomendaSchema);