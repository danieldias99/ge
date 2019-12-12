const UserModel = require('../models/cliente');

module.exports = {
    isAdmin: function (userEmail, role, res, func) {
        UserModel.findOne({ email: userEmail }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed.' });
            }
            else if (user) {
                func(role === 'administrator' && user.isAdmin === true)
            }
        });
    },

    isCliente: function (userEmail, role, res, func) {
        UserModel.findOne({ email: userEmail }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed.' });
            }
            else if (user) {
                func(role === 'cliente' && user.isAdmin === false)
            }
        });
    }
}