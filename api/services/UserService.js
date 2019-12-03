const UserRepository = require('./../repositories/UserRepository');

class UserService {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        return this.repository.getAll();
    }
}


module.exports = new UserService(UserRepository);