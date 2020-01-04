const express = require('express');
const router = express.Router();

const VerifyToken = require('../Middleware/VerifyToken');
const acl = require('../Middleware/AutorizacoesAcl');
const controller = require('../controllers/ConfiguracaoController');

router.post('/addConf', (req, res, next) => {
    VerifyToken.verifyToken(req, res, next);
    acl.isAllowed(req.body.user, 'configuracao', 'adicionar', function (err, resp) {
        if (resp) {
            controller.add(req, res);
        } else if (err || !resp) {
            res.status(403).json({ auth: false, message: 'Sem autorização para este serviço' });
        }
    });
});

module.exports = router;