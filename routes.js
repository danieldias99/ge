const clienteRoutes = require('./api/routes/ClienteRoutes');
const encomendasRoutes = require('./api/routes/EncomendaRoutes');

module.exports = {
    setRoutes: function (server) {
        server.use('/api/cliente', clienteRoutes);
        server.use('/api/encomenda', encomendasRoutes);
    }
}