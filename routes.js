const clienteRoutes = require('./api/routes/ClienteRoutes');
const usersRoutes = require('./api/routes/UserRoutes');

/*export default (server) => {

    //Cliente Routes
    server.get('/api/cliente', ClienteController.getAll);
    server.get('/api/cliente/:id', ClienteController.get);
    server.post('/api/cliente', ClienteController.insert)
    server.put('/api/cliente/:id', ClienteController.update);
    server.delete('/api/cliente/:id', ClienteController.delete);
}*/

module.exports = {
    setRoutes: function (server) {
        server.use('/api/cliente', clienteRoutes);
        server.use('/api/users', usersRoutes);
        
        /*server.get('/api/cliente/:id', ClienteController.get);
        server.post('/api/cliente', ClienteController.insert)
        server.put('/api/cliente/:id', ClienteController.update);
        server.delete('/api/cliente/:id', ClienteController.delete);*/
    }
}