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

    async getByID(email) {
        return this.repository.getByEmail(email);
    }

    async signIn(body) {
        return this.repository.signIn(body.email);
    }

    async update(body) {
        return this.repository.update(body);
    }
}

module.exports = new ClienteService(ClienteRepository);