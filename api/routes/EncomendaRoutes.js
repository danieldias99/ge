const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/Authorization');
const VerifyToken = require('../Middleware/VerifyToken');

const EncomendaController = require('./../controllers/EncomendaController');

router.post('/', (req, res, next) => {
    authorization.isCliente(req.body.cliente, 'cliente', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            VerifyToken.verifyToken(req, res, next);
            EncomendaController.insert(req, res);
        }
    });
});

router.get('/', (req, res, next) => {
    authorization.isAdmin(req.body.email, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            VerifyToken.verifyToken(req, res, next);
            EncomendaController.getAll(res);
        }
    });
});

router.get('/cliente', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    EncomendaController.getAllCliente(req, res);
});

router.patch('/cancelar', (req, res, next) => {
    authorization.isAdmin(req.body.email, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            VerifyToken.verifyToken(req, res, next);
            EncomendaController.cancelarEncomenda(req, res);
        }
    });
});

router.patch('/alterar', (req, res, next) => {
    authorization.isAdmin(req.body.email, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            VerifyToken.verifyToken(req, res, next);
            EncomendaController.alterarEncomenda(req, res);
        }
    });
});

module.exports = router;