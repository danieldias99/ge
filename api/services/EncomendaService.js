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

    async getAllCliente(email) {
        return this.repository.getAllCliente(email);
    }

    async cancelarEncomenda(body) {
        return this.repository.updateEstado(body);
    }

    async alterarEncomenda(body) {
        return this.repository.updateAll(body);
    }
}

module.exports = new EncomendaService(EncomendaRepository);