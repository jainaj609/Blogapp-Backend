const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const arr = [];
const login = (req, res) => {
    const loginData = req.body;
    if (!loginData) {
        return res.status(500).send({ msg: "Invalid Data", "data": `${data}` })
    }
    const user = arr.find((item) => {
        console.log(loginData.email === item.email);
        if (loginData.email === item.email) {
            return item;
        }
        else {
            return res.send({ msg: "User is not registered, try to register first" })
        }
    })
    console.log(loginData, user);
    const validate = bcrypt.compareSync(loginData.password, user.password)
    if (validate === true) {
       let secretkey = "secret@123";
       const token = jwt.sign(user.email, secretkey)
       return res.status(200).send({msg:'User loged in successfully', token})
    }
    return res.send({msg:'User password doesn\'t match'})

}
const register = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(500).send({ msg: "Invalid Data", "data": `${data}` })
    }
    const user = arr.find((item) => { return data.email === item.email })

    if (user) {
        return res.status(200).send({ msg: "User already exists please try to login" })
    }
    try {
        const saltRounds = 10;
        data.password = bcrypt.hashSync(data.password, saltRounds);
        arr.push(data);
    } catch (err) {
        res.status(500).send({ msg: "Internal server error!!" })
    }
    res.status(200).send({ msg: "User successfully registered", arr });
}

module.exports = {
    login, register
}