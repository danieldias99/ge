const EncomendaRepository = require('./../repositories/EncomendaRepository');

class EncomendaService {

    constructor(repository) {
        this.repository = repository;
    }

    async insert(body) {
        return this.repository.create(body);
    }

}

module.exports = new EncomendaService(EncomendaRepository);