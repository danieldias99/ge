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

    async getAllCliente(nomeCliente){
        return this.repository.getAllCliente(nomeCliente);
    }

}

module.exports = new EncomendaService(EncomendaRepository);