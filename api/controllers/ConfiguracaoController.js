const acl = require('../Middleware/AutorizacoesAcl');

class ConfiguracaoController {

    async add(req, res) {
        acl.allow(req.body.role, req.body.resources, req.body.permissons);
        res.status(201).json({ response: 'Nova autorização adicionada' }).send();
    }

    async rem(req, res) {
        acl.removeAllow(req.body.role, req.body.resources, req.body.permissons);
        res.status(200).json({ response: 'Autorização eliminada' }).send();
    }
}

module.exports = new ConfiguracaoController();