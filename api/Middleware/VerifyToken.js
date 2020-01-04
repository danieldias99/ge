const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    verifyToken: function (req, res, next) {
        var token = req.body.token;
        if (!token) {
            console.log("No Token");
            return res.status(403).json({ auth: false, message: 'No token provided' });
        }
        jwt.verify(token, config.secret_key, function (err, decoded) {
            if (err) {
                console.log("Wrong token");
                console.log(token);
                return res.status(403).json({ auth: false, message: 'Failed to authenticate token.' }).send();
            }
            req.body.user = decoded.user;
            //console.log(req.body.user);
        });
    }
}
