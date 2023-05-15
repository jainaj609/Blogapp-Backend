const secretkey = "secret@123";
const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {

    const bearerToken = req.headers["authorization"]
    if (bearerToken === undefined) {
        return res.send({ msg: "Unauthorised Person" })
    }
    const token = bearerToken.split(" ")[1];
    const verify = jwt.verify(token, secretkey);
    if (verify) {
        next();
    }
    else {
        return res.send({ msg: "Token is not valid" })
    }

}
module.exports = verification;
