const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: function (req, res, next) {
        var token = req.body.token;
        if (!token) {
            console.log("No Token");
            return res.status(403).json({ auth: false, message: 'No token provided' });
        }
        jwt.verify(token, 'TheSecret_123456789', function (err, decoded) {
            if (err) {
                console.log("Wrong token");
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }
            req.body.user = decoded.user;
            //console.log(req.body.user);
        });
    }
}
