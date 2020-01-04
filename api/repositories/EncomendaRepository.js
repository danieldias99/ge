const Encomenda = require('./../models/encomenda');
const request = require('request');

const config = require('../../config');

class EncomendaRepository {

    constructor(model) {
        this.model = model;
    }

    async create(toCreate) {
        const encomenda = new Encomenda({
            cliente: toCreate.user,
            produtos: toCreate.produtos,
            data_entrega: toCreate.data_entrega
        });

        console.log(encomenda);
        encomenda.save();
    }

    async getAll() {
        return this.model.find({});
    }

    async getAllCliente(email_tosearch) {
        return this.model.find({ cliente: email_tosearch });
    }

    async getById(id) {
        return this.model.findOne({ _id: id });
    }

    async updateEstado(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, { estado: 'cancelado' });
    }

    async pedidoCancelar(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, { estado: 'A cancelar...' });
    }

    async updateAll(toUpdate) {
        return this.model.findOneAndUpdate({ _id: toUpdate._id }, {
            produtos: toUpdate.produtos,
            estado: toUpdate.estado,
            data_entrega: toUpdate.data_entrega
        });
    }

    async getProdutosMaisVezesEncomendados() {
        var _data = [];
        var encomendas = await this.getAll();
        encomendas.forEach(encomenda => {
            encomenda.produtos.forEach(produto => {
                if (this.produtoNaoAvaliado(_data, produto.nomeProduto)) {
                    var cont = this.contaEncomendasProduto(encomendas, produto.nomeProduto);
                    var element = {
                        nomeProduto: produto.nomeProduto,
                        stati: cont
                    }
                    _data.push(element);
                }
            });
        });
        _data.sort((a, b) => b.stati - a.stati);
        return _data;
    }

    produtoNaoAvaliado(array, nomeProduto) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].nomeProduto === nomeProduto) {
                return false;
            }
        }
        return true;
    }

    contaEncomendasProduto(encomendas, nomeProduto) {
        var count = 0;
        for (var i = 0; i < encomendas.length; i++) {
            var produtos = encomendas[i].produtos;
            for (var j = 0; j < produtos.length; j++) {
                if (produtos[j].nomeProduto === nomeProduto) {
                    count++;
                }
            }
        }
        return count;
    }

    async getProdutosMaisEncomendados() {
        var _data = [];
        var encomendas = await this.getAll();
        encomendas.forEach(encomenda => {
            encomenda.produtos.forEach(produto => {
                if (this.produtoNaoAvaliado(_data, produto.nomeProduto)) {
                    var cont = this.contaProdutoEncomendas(encomendas, produto.nomeProduto);
                    var element = {
                        nomeProduto: produto.nomeProduto,
                        stati: cont
                    }
                    _data.push(element);
                }
            });
        });
        _data.sort((a, b) => b.stati - a.stati);
        return _data;
    }

    contaProdutoEncomendas(encomendas, nomeProduto) {
        var count = 0;
        for (var i = 0; i < encomendas.length; i++) {
            var produtos = encomendas[i].produtos;
            for (var j = 0; j < produtos.length; j++) {
                if (produtos[j].nomeProduto === nomeProduto) {
                    count = count + parseInt(produtos[j].quantidade);
                }
            }
        }
        return count;
    }

    getProdutos() {
        return new Promise((resolve, reject) => {
            request.get(config.mdp_url + '/api/Produto', (error, response, body) => {

                let array_produtos = JSON.parse(body);
                resolve(array_produtos);

                response.on('error', (error) => {
                    reject(error);
                });
            });
        });
    }

    async getProdutosMenorTempoProducao() {
        var _data = [];
        let request_produtos = this.getProdutos();
        let response = await request_produtos;
        let array_produtos = response;
        console.log(array_produtos);
        array_produtos.forEach(produto => {
            let element = {
                nomeProduto: produto.nomeProduto,
                stati: produto.planofabrico.tempo_fabrico
            };
            _data.push(element);
        });
        _data.sort((a, b) => a.stati - b.stati);
        return _data;
    }

}

module.exports = new EncomendaRepository(Encomenda);