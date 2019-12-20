const Encomenda = require('./../models/encomenda');

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
                        total_encomendas: cont
                    }
                    _data.push(element);
                }
            });
        });
        _data.sort((a, b) => b.total_encomendas - a.total_encomendas);
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

}

module.exports = new EncomendaRepository(Encomenda);