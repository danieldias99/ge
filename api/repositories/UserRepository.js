const User = require('./../models/user');

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return this.model.find();
    }
}

module.exports = new UserRepository(User);