const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token)
            return res.status(403).json({ auth: false, message: 'No token provided' });
        jwt.verify(token, 'TheSecret_123456789', function (err, decoded) {
            if (err)
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            req.user = decoded.user;
        });
    }
}
