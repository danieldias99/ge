const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');

router.get('/', (req, res, next) => {
    UserController.getAll(res);
});

module.exports = router;
