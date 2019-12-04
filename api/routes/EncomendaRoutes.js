const express = require('express');
const router = express.Router();

const EncomendaController = require('./../controllers/EncomendaController');

router.post('/', (req, res, next) => {
    EncomendaController.insert(req, res);
});

router.get('/', (req, res, next) => {
    EncomendaController.getAll(res);
});

router.get('/cliente/:clienteID', (req, res, next) => {
    EncomendaController.getAllCliente(req, res);
});

router.patch('/', (req, res, next) => {
    EncomendaController.cancelarEncomenda(req, res);
});

module.exports = router;