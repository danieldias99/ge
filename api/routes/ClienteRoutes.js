const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/Authorization');
const VerifyToken = require('../Middleware/VerifyToken');

const ClienteController = require('./../controllers/ClienteController');

router.get('/', (req, res, next) => {
    authorization.isAdmin(req.body.email, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            VerifyToken.verifyToken(req, res, next);
            ClienteController.getAll(res);
        }
    });
});

router.post('/', (req, res, next) => {
    authorization.isCliente(req.body.email, 'cliente', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            ClienteController.insert(req, res);
        }
    });
});

router.get('/cliente', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    ClienteController.getByID(req, res);
});

router.patch('/cliente', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    ClienteController.update(req, res);
});

router.post('/signIn', (req, res, next) => {
    ClienteController.signIn(req, res);
});

module.exports = router;