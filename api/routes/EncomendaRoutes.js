const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/Authorization');
const VerifyToken = require('../Middleware/VerifyToken');
const acl = require('../Middleware/AutorizacoesAcl');

const EncomendaController = require('./../controllers/EncomendaController');

router.post('/', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomenda', 'criar', function (err, resp) {
        if (resp) {
            EncomendaController.insert(req, res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/getEncomendas', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomendas', 'consultar', function (err, resp) {
        console.log(resp);
        if (resp) {
            EncomendaController.getAll(res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/getEncomendasCliente', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomenda', 'consultar', function (err, resp) {
        if (resp) {
            EncomendaController.getAllCliente(req, res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/getEncomenda', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomenda', 'consultar', function (err, resp) {
        if (resp) {
            EncomendaController.getEncomenda(req, res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.patch('/cancelar', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomenda', 'cancelar', function (err, resp) {
        if (resp) {
            EncomendaController.cancelarEncomenda(req, res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.patch('/pedido-cancelar', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomenda', 'cancelar', function (err, resp) {
        if (resp) {
            EncomendaController.cancelarEncomenda(req, res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.patch('/alterar', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'encomenda', 'alterar', function (err, resp) {
        if (resp) {
            EncomendaController.alterarEncomenda(req, res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/produtosMaisVezesEncomendados', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'stats', 'consultar', function (err, resp) {
        if (resp) {
            EncomendaController.getProdutosMaisVezesEncomendados(res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/produtosMaisEncomendados', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'stats', 'consultar', function (err, resp) {
        if (resp) {
            EncomendaController.getProdutosMaisEncomendados(res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

router.post('/produtosMenorTempoProducao', (req, res, next) => {
    var message;
    message = VerifyToken.verifyToken(req, message);
    if (message) {
        return res.status(403).json({ auth: false, message: message });
    }
    acl.isAllowed(req.body.user, 'stats', 'consultar', function (err, resp) {
        if (resp) {
            EncomendaController.getProdutosMenorTempoProducao(res);
        } else if (err || !resp) {
            return res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

module.exports = router;