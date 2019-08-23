const jwt = require('jsonwebtoken');

const secrets = require('./secrets');

module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
        isCool: true,
        likesJokes: 'absolutely'
    };

    const options = {
        expiresIn: '8h'
    };
    
    return jwt.sign(payload, secrets.jwtSecret, options);
}