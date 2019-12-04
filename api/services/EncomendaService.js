const EncomendaRepository = require('./../repositories/EncomendaRepository');

class EncomendaService {

    constructor(repository) {
        this.repository = repository;
    }

    async insert(body) {
        return this.repository.create(body);
    }

    async getAll() {
        return this.repository.getAll();
    }

    async getAllCliente(nomeCliente) {
        return this.repository.getAllCliente(nomeCliente);
    }

    async cancelarEncomenda(nomeCliente_tosearch, data_pedido_tosearch) {
        console.log(nomeCliente_tosearch);
        console.log(data_pedido_tosearch);
        return this.repository.updateEstado(nomeCliente_tosearch, data_pedido_tosearch);
    }

}

module.exports = new EncomendaService(EncomendaRepository);