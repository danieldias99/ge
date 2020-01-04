const node_acl = require('acl');
const acl = new node_acl(new node_acl.memoryBackend());
const ClienteRepository = require('./../repositories/ClienteRepository');

set_roles();

async function set_roles() {
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


    var clientes = await ClienteRepository.getAll()
    clientes.forEach(cliente => {
        if (cliente.isAdmin) {
            acl.addUserRoles(cliente.email, 'admin');
        } else {
            acl.addUserRoles(cliente.email, 'client');
        }
        acl.userRoles(cliente.email, function (err, roles) {
            console.log(roles);
        });
    });
}

module.exports = acl;