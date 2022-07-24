const express = require('express'); 
const app = express();
const routes = express.Router();
const fileController = require('../controller/files');

//return all data
routes.get('/data/start',fileController.generateAllData);


// Create GET /data/all API that returns random 1000 data values from the 2000 data values you generated previously.
//format {    _id: 120, name: "isro", },
routes.get('/data/all',fileController.generateRandomData);



//Create GET /data/fixed API that returns 100 data values, 80 randomly from input.json 
//and 20 other unique data from second file
// { _id: 130,      position: 4,},
routes.get('/data/fixed',fileController.generateMixData);


// Create GET data/_id/{_id} API ( {_id} is a parameter ) that returns data from input.json file based on _id property. 
// If data for the given id is not found in input.json then the API ( data/_id ) should throw an error. 
// { _id: "_id",  name: "spaceX", },
routes.get('/data/_id/:id',fileController.findData);





module.exports = routes;