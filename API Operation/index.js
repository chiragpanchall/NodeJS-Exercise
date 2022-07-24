require('./global');
const express = require('express');
const cors = require('cors');
const app = express(); 
const routes  = require('./Routes/routes');

app.use(cors());
app.use('/',routes);
app.listen(PORT,()=>{
    console.log("server is listning");
})