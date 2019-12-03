const ClienteRepository = require('./../repositories/ClienteRepository');

class ClienteService {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        return this.repository.getAll();
    }

    async insert(body) {
        return this.repository.create(body);
    }
}


module.exports = new ClienteService(ClienteRepository);