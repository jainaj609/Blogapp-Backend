const secretkey = "secret@123";
const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {

    const bearerToken = req.headers["authorization"]
    if (bearerToken === undefined) {
        return res.send({ msg: "Unauthorised Person" })
    }
    const token = bearerToken.split(" ")[1];
    try {
        jwt.verify(token, secretkey);
        next();
    } catch (error) {
        return res.send({ msg: "Token is not valid" })
    }
}
module.exports = verification;
