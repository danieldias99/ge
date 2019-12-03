const express = require('express');
const router = express.Router();

//Handling GET request in /encomendas
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Handling GET'
    });
});

//Handling POST request in /encomendas
router.post('/', (req, res, next) => {
    res.status(201).json({
        message : 'Handling GET'
    });
});

//Handling GET request in /encomendas/:id
router.get('/:encomendaID', (req, res, next) => {
    const id = req.params.encomendaID;
    res.status(200).json({
        message : 'Handling GET 1 encomenda',
        id: id
    });
});

//Handling PATCH request in /encomendas/id
router.patch('/:encomendaID', (req, res, next) => {
    res.status(200).json({
        message : 'Handling Update',
    });
});

//Handling DELETE request in /encomendas/id
router.delete('/:encomendaID', (req, res, next) => {
    res.status(200).json({
        message : 'Handling Delete',
    });
});

module.exports = router;