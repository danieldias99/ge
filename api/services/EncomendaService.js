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

    async getEncomenda(id) {
        return this.repository.getById(id);
    }

    async cancelarEncomenda(body) {
        return this.repository.updateEstado(body);
    }

    async pedidoCancelarEncomenda(body) {
        return this.repository.pedidoCancelar(body);
    }

    async alterarEncomenda(body) {
        return this.repository.updateAll(body);
    }

    async getProdutosMaisVezesEncomendados() {
        return this.repository.getProdutosMaisVezesEncomendados();
    }

    async getProdutosMaisEncomendados() {
        return this.repository.getProdutosMaisEncomendados();
    }
}

module.exports = new EncomendaService(EncomendaRepository);