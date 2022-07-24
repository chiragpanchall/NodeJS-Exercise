const mongoose = require('mongoose');
const config = require('../system_variable');

const userSchema = mongoose.Schema({
    firstname : {type:String,required:true},
    lastname : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
});

const auth = mongoose.model('auth',userSchema);

const connect = () =>{ 
  mongoose.connect("mongodb://localhost:27017",()=>{
      console.log("Database connected !!");
  });  
}

connect();



module.exports =  auth;