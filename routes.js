const clienteRoutes = require('./api/routes/ClienteRoutes');
const encomendasRoutes = require('./api/routes/EncomendaRoutes');
const configuracaoRoutes = require('./api/routes/ConfiguracaoRoutes');

module.exports = {
    setRoutes: function (server) {
        server.use('/api/cliente', clienteRoutes);
        server.use('/api/encomenda', encomendasRoutes);
        server.use('/api/config', configuracaoRoutes);
    }
}