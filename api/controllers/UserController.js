const UserService = require("./../services/UserService");

class UserController {

    constructor(service) {
        this.service = service;
    }

    async getAll(res) {
        this.service.getAll(res)
            .then(docs => {
                console.log(docs);
                if (docs.length >= 0) {
                    res.status(200).json(docs);
                } else {
                    res.status(404).json({
                        message: 'No entries found'
                    });
                }
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
}

module.exports = new UserController(UserService);