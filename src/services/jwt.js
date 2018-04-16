'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_ejemplo_IN6AV'
exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1, 'minute').unix
    };

    return jwt.encode(payload, secret);
}