const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const encomendaSchema = new Schema({
    nomeCliente: String,
    produtos: [
        {
            nomeProduto: String,
            quantidade: Number
        }
    ],
    data_pedido: { type: Date, default: Date.now },
    data_entrega: { type: Date },
    estado: { type: String, default: 'encomendado' }
});

module.exports = mongoose.model('Encomenda', encomendaSchema);