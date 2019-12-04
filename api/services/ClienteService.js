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

    async getByID(nr_idCivil){
        return this.repository.getByNr_idCivil(nr_idCivil);
    }
}


module.exports = new ClienteService(ClienteRepository);