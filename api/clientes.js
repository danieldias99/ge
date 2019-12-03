const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cliente = require('./models/cliente');

//Handling GET request in /clientes
router.get('/', (req, res, next) => {
    Cliente.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Handling POST request in /clientes
router.post('/', (req, res, next) => {
    const cliente = new Cliente({
        nr_idCivil: req.body.nr_idCivil,
        nome: req.body.nome,
        email: req.body.email,
        nr_telemovel: req.body.nr_telemovel,
        password: req.body.password,
        metodo_pagamento: req.body.metodo_pagamento,
        modo_entrega: req.body.modo_entrega,
        morada: req.body.morada,
        cod_postal: req.body.cod_postal
    });

    cliente.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /clientes',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Handling GET request in /clientes/:nr_idCivil
router.get('/:clienteID', (req, res, next) => {
    const nr_idCivil = req.params.clienteID;
    Cliente.findById(nr_idCivil)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry  found for provided ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Handling PATCH request in /clientes/id
router.patch('/:clienteID', (req, res, next) => {
    const nr_idCivil = req.params.clienteID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Cliente.update({ nr_idCivil: nr_idCivil }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Handling DELETE request in /clientes/id
router.delete('/:clienteID', (req, res, next) => {
    const nr_idCivil = req.params.clienteID;
    Cliente.remove({ nr_idCivil: nr_idCivil })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;