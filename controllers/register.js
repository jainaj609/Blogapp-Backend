const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const arr = [];
const login = (req, res) => {
    let loginData = req.body;
    if (!loginData) {
        return res.status(500).send({ msg: "Invalid Data", "data": `${data}` })
    }
    
    let user = arr.find((item) => {  
        console.log(item);
        if (loginData.email === item.email) {
            return item;
        }
    })
    if(!user){
        return res.send({ msg: "User is not registered, try to register first" })
    }
    console.log(loginData, user);
    let validate = bcrypt.compareSync(loginData.password, user.password)
    if (validate === true) {
       const secretkey = "secret@123";
       let data = {
        email: user.email, 
        password: user.password
       };
       let token = jwt.sign({data}, secretkey)
       return res.status(200).send({msg:'User loged in successfully', token})
       user=null;
    }
    return res.send({msg:'User password doesn\'t match'})

}
const register = (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(500).send({ msg: "Invalid Data", "data": `${data}` })
    }
    let user = arr.find((item) => { return data.email === item.email })

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
    res.status(200).send({ msg: "User successfully registered", data });
}

module.exports = {
    login, register
}