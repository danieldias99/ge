const express = require('express');
const router = express.Router();

const ClienteController = require('./../controllers/ClienteController');

router.get('/', (req, res, next) => {
    ClienteController.getAll(res);
});
router.post('/', (req, res, next) => {
    ClienteController.insert(req, res);
});

module.exports = router;