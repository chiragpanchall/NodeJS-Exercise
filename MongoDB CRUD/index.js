const routers = require('./routes/routes'); //
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use('/', routers);

app.listen(8080, () => {
   console.log("Listining on the port ");
});

