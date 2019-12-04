const express = require('express');
const router = express.Router();

const EncomendaController = require('./../controllers/EncomendaController');

router.post('/', (req, res, next) => {
    EncomendaController.insert(req, res);
});

module.exports = router;