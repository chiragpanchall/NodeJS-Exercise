// CRUD of file
const file = require('fs');
const file1 = "file1.json";
// const file2 = "file2.json";
// const file3 = "file3.json";

exports.writeFile1 = async (data) => {
       file.writeFile(file1, data, (err) => {
        if (err) console.error(err);
    });
   let fileData = this.readFileData(file1);
   return fileData;
}

exports.readFileData = async(fileName) => {
    let data = await file.promises.readFile(fileName, { encoding: 'utf8' })
    return data;
}

