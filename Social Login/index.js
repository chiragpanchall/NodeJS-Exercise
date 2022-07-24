const express = require('express');
const session = require('express-session');
const cors  = require('cors');
const app = express();
app.use(session({
  secret: "coockieSecret"
}));
const routers = require('./routes/autheRoutes');
app.use(cors());
app.use(express.json());
app.use('/',routers);
app.listen(8080,()=>{
    console.log("Server Connected successfully");
});
