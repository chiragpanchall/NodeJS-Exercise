const db = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');


exports.checkLConnection = (req, res) => {
   res.send('Login');
};

exports.getUser = async (req, res) => {
   if (req.body.email.length == 0 || req.body.password.length == 0) {
      console.log(req.body.email);
      res.status(400).send({ value: "false", msg: "Fill all data [Server-side]" });
      return;
   }
   const checkData = await db.findOne({ "email": req.body.email }).exec()
      .then((user) => {
         if (!user) {
            res.status(400).send({ value: "false", msg: "User does not exist" });
            console.log("Not found user" + user);
         }

         const match = bcrypt.compareSync(req.body.password, user.password);
         if (!match) {
            res.status(400).send({ value: "false", msg: "Please Enter  valid password" });
         }
         else {
            const payload = { email: user.email, _id: user._id };
            const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });
            return res.send({
               value: "True",
               msg: `Congratulations ${user.firstname} ${user.lastname} `,
               token: "bearer " + token
            });
         }
      })
      .catch((err) => {
         res.status(400).send({ value: "false", msg: "Please Enter valid email and password : " + err });
      })
};


exports.dashboard = async (req, res) => {
   const userData = {
      "value": true,
      'msg': 'Successfully logged in',
      data: req.user
   }
   return res.json(userData);

}


exports.googleLogin = async (req, res) => {

   let name = req.user.displayName.split(' ');
   let email = req.user.emails;
   const checkData = new db({
      firstname: name[0],
      lastname: name[1],
      email: email[0].value,
      password: "ere3324gad232@45sd"
   });

   const checkEmail = await db.find({ "email": email[0].value }).exec();

   if (checkEmail.length !== 0) {
      //   getting users data  and set token of it
      const payload = { email: checkEmail.email, _id: checkEmail._id };
      const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });

      res.send({
         value: "True",
         msg: `Old Account`,
         "firstname": checkEmail[0].email,
         "lastname": checkEmail[0].lastname,
         "password": checkEmail[0].password,
         "token": "bearer " + token
      });
      return;
   }
  //saving new user
   checkData.save()
      .then((doc) => {
         const payload = { email: doc.email, _id: doc._id };
         const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });
         res.send({
            value: "True",
            msg: `New Account created successfully`,
            "firstname": doc.email,
            "lastname": doc.lastname,
            "password": doc.password,
            "token": "bearer " + token,
         });
      })
      .catch((err) => {
         res.status(400).send({ value: "false", msg: `Failed to create account`, "error": err });
      });
}

exports.facebookSignIn = async (req, res) => {
   // res.send(req.user);

   let name = req.user.displayName.split(' ');
   let email = req.user.id;
   const checkData = new db({
      firstname: name[0],
      lastname: name[1],
      email: email,
      password: "ere3324gad232@45sd"
   });

   const checkEmail = await db.find({ "email": email }).exec();

   if (checkEmail.length !== 0) {
      //   old users data  and set token of it
      const payload = { email: checkEmail.email, _id: checkEmail._id };
      const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });

      res.send({
         value: "True",
         msg: `Old Account`,
         "firstname": checkEmail[0].firstname,
         "lastname": checkEmail[0].lastname,
         "password": checkEmail[0].password,
         "token": "bearer " + token
      });
      return;
   }

   //new user data
   checkData.save()
      .then((doc) => {
         const payload = { email: doc.email, _id: doc._id };
         const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });
         res.send({
            value: "True",
            msg: `New Account created successfully`,
            "firstname": doc.firstname,
            "lastname": doc.lastname,
            "password": doc.password,
            "token": "bearer " + token,
         });
      })
      .catch((err) => {
         res.status(400).send({ value: "false", msg: `Failed to create account`, "error": err });
      });
}


exports.githubSignIn = async (req, res) => {
   let name = req.user.username;   
   let email = name+"@gmail.com"; //creating temp email
   console.log(email);
   
   const checkData = new db({
      firstname: name,
      lastname: name,
      email: email,
      password: "ere3324gad232@45sd"
   });
 
   const checkEmail = await db.find({ "email": email }).exec();

   if (checkEmail.length !== 0) {
      // old users data
      const payload = { email: checkEmail.email, _id: checkEmail._id };
      const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });

      res.send({
         value: "True",
         msg: `Old Account`,
         "firstname": checkEmail[0].email,
         "lastname": checkEmail[0].lastname,
         "password": checkEmail[0].password,
         "token": "bearer " + token
      });
      return;
   }
 
   //new user data
   checkData.save()
      .then((doc) => {
         const payload = { email: doc.email, _id: doc._id };
         const token = jwt.sign(payload, "secretJsonToken", { expiresIn: '1h' });
         res.send({
            value: "True",
            msg: `New Account created successfully Please change email and password`,
            "email":doc.email,
            "firstname": doc.firstname,
            "lastname": doc.lastname,
            "password": doc.password,
            "token": "bearer " + token,
         });
      })
      .catch((err) => {
         res.status(400).send({ value: "false", msg: `Failed to create account`, "error": err });
      });
}