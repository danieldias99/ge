const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/Authorization');
const VerifyToken = require('../Middleware/VerifyToken');

const EncomendaController = require('./../controllers/EncomendaController');

router.post('/', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isCliente(req.body.user, 'cliente', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            EncomendaController.insert(req, res);
        }
    });
});

router.post('/getEncomendas', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isAdmin(req.body.user, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            EncomendaController.getAll(res);
        }
    });
});

router.post('/getEncomendasCliente', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    console.log(req.body.user);
    EncomendaController.getAllCliente(req, res);
});

router.post('/getEncomenda', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    EncomendaController.getEncomenda(req, res);
});

router.patch('/cancelar', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isAdmin(req.body.user, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            EncomendaController.cancelarEncomenda(req, res);
        }
    });
});

router.patch('/pedido-cancelar', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isCliente(req.body.user, 'cliente', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            EncomendaController.pedidoCancelarEncomenda(req, res);
        }
    });
});

router.patch('/alterar', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isAdmin(req.body.user, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            EncomendaController.alterarEncomenda(req, res);
        }
    });
});

router.post('/produtosMaisVezesEncomendados', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    EncomendaController.getProdutosMaisVezesEncomendados(res);
});

router.post('/produtosMaisEncomendados', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    EncomendaController.getProdutosMaisEncomendados(res);
});

module.exports = router;