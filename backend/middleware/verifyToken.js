const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.SECRETE_KEY, (err, data) => {
        if (err) {
            return res.status(401).send({ success: false, message: "invalid token!" })
        }
        else {
            req.id = data.id;
            req.email = data.email
            next();
        }
    });
}

module.exports = verifyToken;