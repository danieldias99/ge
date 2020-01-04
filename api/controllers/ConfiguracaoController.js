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

    async fetch(res) {
        var permC = await this.fetchConfRole(['client']);
        var permA = await this.fetchConfRole(['admin']);
        res.status(200).json({
            admin: permA,
            client: permC
        }).send();
    }

    async fetchConfRole(roles) {
        var perm = null;
        await acl.whatResources(roles, function (err, permissons) {
            console.log(permissons);
            perm = permissons;
        });
        return perm;
    }
}

module.exports = new ConfiguracaoController();