
const uid = require('uuid');
const files = require('../model/files');


let object1000 = []; //defining global var for the 1000 objects
// let object80_With_Position = [];


// generating data
generateObj = (len) => {
    let set = new Set();
    while (set.size !== len) {
        let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*';
        let name = ' ';
        for (let i = 0; i < 10; i++)
            name += alpha.charAt(Math.floor(Math.random() * alpha.length));
        let id = uid.v4();
        let i = 0;
        let dataObject = { "_id": id, "name": name };
        i++;
        set.add(dataObject);
    }
    let data = [...set];
    let input = { "input": data };
    return JSON.stringify(input);
}


//Sending all data // localhost:8080/data/start
exports.generateAllData = (req, res) => {
    let generateData = generateObj(2000);
    const data = files.writeFile1(generateData);
    return res.send(data);
}


//Sending random data  ///data/all
exports.generateRandomData = async(req, res) => {

    const arr = JSON.parse(await files.readFileData("file1.json"));
     
    const randomData = new Set();

    while (randomData.size != 1000)
        randomData.add(arr["input"][Math.floor(Math.random() * 1000)]);

    object1000 = [...randomData];
    // return res.send(JSON.stringify([...randomData]));
    res.send([...randomData]);
}


//Sending unique data of two file... /data/fixed
//read data from 2000 data
exports.generateMixData = async(req, res) => {
    const arr = JSON.parse(await files.readFileData("file1.json"));   //files.readFileData("file1.json");

    const randomData = new Set();

    while (randomData.size != 80)
        randomData.add(arr["input"][Math.floor(Math.random() * 1000)]);
    const data = [...randomData];

    //creating unique number array
    let rand = new Set();
    while (rand.size <= 100)
        rand.add(Math.ceil(Math.random() * 1000));

    let uniqueNumber = [...rand];
    for (let i = 0; i < 80; i++) {
        delete data[i].name;
        data[i].position = uniqueNumber[i];
    }

    object80_With_Position = [...data];
    // 
    for (let i = 0; i < 20; i++)
        data.push({ "id": uid.v4() });


    for (let i = 80; i < 100; i++) {
        data[i].position = uniqueNumber[i];
    }

    res.send(data.sort((a, b) => a.position - b.position));
}

//find object in file with id... /data/_id/:id
exports.findData = async(req, res) => {
    const dataArray =JSON.parse(await files.readFileData("file1.json")); 
    
    let obj = dataArray['input'].find((obj) => obj._id == req.params.id);

    if (obj === undefined || obj === null)
        return res.send({ "status": false, "message": "ID is not found" });

    res.send([{ "status": true, "data": obj }]);
}







