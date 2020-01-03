var node_acl = require('acl');
var acl = new node_acl(new node_acl.memoryBackend());

set_roles();

function set_roles() {
    acl.allow([
        {
            roles: 'admin',
            allows: [
                { resources: 'encomendas', permissions: 'consultar' },
                { resources: 'clientes', permissions: 'consultar' },
                { resources: 'cliente', permissions: ['consultar', 'apagar', 'alterar'] },
                { resources: 'encomenda', permissions: ['consultar', 'cancelar', 'alterar'] },
                { resources: 'stats', permissions: ['consultar'] }
            ]
        },
        {
            roles: 'client',
            allows: [
                { resources: 'cliente', permissions: ['criar', 'consultar', 'apagar', 'alterar'] },
                { resources: 'encomenda', permissions: ['criar', 'consultar', 'cancelar', 'alterar'] },
                { resources: 'stats', permissions: ['consultar'] }
            ]
        }
    ]);
}

module.exports = acl;