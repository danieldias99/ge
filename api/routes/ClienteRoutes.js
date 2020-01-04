const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/Authorization');
const VerifyToken = require('../Middleware/VerifyToken');
const acl = require('../Middleware/AutorizacoesAcl');

const ClienteController = require('./../controllers/ClienteController');

router.post('/getUsers', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    acl.isAllowed(req.body.user, 'clientes', 'consultar', function (err, resp) {
        if (resp) {
            ClienteController.getAll(res);
        } else if (err|| !resp) {
            res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/', async (req, res, next) => {
    if (req.body.isAdmin) {
        acl.addUserRoles(req.body.email, 'admin');
    } else {
        acl.addUserRoles(req.body.email, 'client');
    }

    acl.userRoles(req.body.email, function (err, roles) {
        console.log(roles);
    });

    ClienteController.insert(req, res);
});

router.post('/getUser', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    acl.isAllowed(req.body.user, 'cliente', 'consultar', function (err, resp) {
        if (resp) {
            ClienteController.getByID(req, res);
        } else if (err|| !resp) {
            res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.patch('/', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    acl.isAllowed(req.body.user, 'cliente', 'alterar', function (err, resp) {
        if (resp) {
            ClienteController.update(req, res);
        } else if (err|| !resp) {
            res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.patch('/updateCliente', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    acl.isAllowed(req.body.user, 'cliente', 'alterar', function (err, resp) {
        if (resp) {
            ClienteController.updateCliente(req, res);
        } else if (err|| !resp) {
            res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});


router.post('/signIn', (req, res, next) => {
    ClienteController.signIn(req, res);
});

module.exports = router;