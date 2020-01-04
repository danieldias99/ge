const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    verifyToken: function (req) {
        var token = req.body.token;
        if (!token) {
            console.log("No Token");
            return 'No token provided';
        }
        return jwt.verify(token, config.secret_key, function (err, decoded) {
            if (err) {
                console.log("Wrong token");
                return 'Failed to authenticate token';
            }
            req.body.user = decoded.user;
        });
    }
}
