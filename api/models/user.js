const mongoose = require('mongoose');

var idvalidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: String,
    email: String,
    password: String,
    isAdmin: Boolean
});

//userSchema.plugin(idvalidator);

module.exports = mongoose.model('user', userSchema);