const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/Authorization');
const VerifyToken = require('../Middleware/VerifyToken');

const ClienteController = require('./../controllers/ClienteController');

router.post('/getUsers', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isAdmin(req.body.user, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            ClienteController.getAll(res);
        }
    });
});

router.post('/', (req, res, next) => {
    ClienteController.insert(req, res);
});

router.post('/getUser', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    ClienteController.getByID(req, res);
});

router.patch('/', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    ClienteController.update(req, res);
});

router.patch('/updateCliente', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    authorization.isAdmin(req.body.user, 'administrator', res, function (decision) {
        if (!decision) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        } else {
            ClienteController.updateCliente(req, res);
        }
    });
});

router.post('/signIn', (req, res, next) => {
    ClienteController.signIn(req, res);
});

module.exports = router;