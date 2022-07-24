const db = require("../model/user");
const config = require('../system_variable');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.checkSConnection = (req, res) => {
    res.send('Signup');
};

exports.addUser = async (req, res) => {
    if (req.body.email.length == 0 || req.body.password.length == 0 || req.body.firstname.length == 0 || req.body.lastname.length == 0) {
        console.log(req.body.email);
        res.send({ value: "false", msg: "Fill all data [Server-side]" });
        return;
    }
    const hashPassword = await bcrypt.hash(req.body.password,10);
    
    const checkData = new db({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword
    });
    const checkEmail = await db.find({ "email": req.body.email,}).exec();
    if (checkEmail.length !== 0) {
        res.status(400).send({ value: "false", msg: "User exists" });
        return;
    }
    
    const saved = checkData.save()
        .then((doc) => {
            const payload = { email: doc.email, _id: doc._id };
            const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });
            res.send({ value: "True", 
            msg: `Account created successfully + ${doc.firstname}`,
            "token":"bearer " + token
        });
        })
        .catch((err) => {
            res.status(400).send({ value: "false", msg: `Failed to create account`,"error":err});
        });

};