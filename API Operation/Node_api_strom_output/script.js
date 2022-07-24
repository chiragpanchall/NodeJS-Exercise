import fetch from 'node-fetch';
import file from 'fs';

// const file = require('file');
// start     = will generate random 2000 data
// data/all  = generate the 1000 random data
// data/fixed = value with position
// data/id/_id = find data in 2000 and 1000 data


async function RunData() {
    const response1 = await fetch('http://localhost:8080/data/start'); //create the file and store 2000
    const response2 = await fetch('http://localhost:8080/data/all');  //get 1000 data
    const object1000 = await response2.json();
    const response3 = await fetch('http://localhost:8080/data/fixed'); //create unique 100 data 
    const object80_With_Position = await response3.json();


    // console.log(object80_With_Position.length);

    for (let i = 0; i < object80_With_Position.length; i++) {
        let arrangeData = object80_With_Position[i]; // id and position
        
        let data =   object1000.find((element) => element._id == arrangeData._id);
        // console.log(JSON.stringify(data));
        
        if (data === undefined) {
            const idData = await fetch(`http://localhost:8080/data/_id/${arrangeData._id}`);
            const foundData = await idData.json(); //id and position
          
            if (foundData.status == false) {
                continue;  
            }

            arrangeData.name = foundData.name;
            object1000.splice(arrangeData.position, 0, arrangeData);
             
        }
            else {
                arrangeData.name = data.name;
                let elePos = object1000.findIndex((object) => { object._id == data._id });
                object1000.splice(elePos, 1);
                object1000.splice(arrangeData.position, 0, arrangeData);
            }
    }

    let count = 0;
        object1000.forEach(function(element) {
            element.index = count;
            count++;
        });

        file.writeFile("output.json",JSON.stringify(object1000),(err)=>{}); 
        console.log("Total length "+object1000.length);
  }

RunData();




















// async function RunData() {
//     const response1 = await fetch('http://localhost:8080/data/start');
//     const response2 = await fetch('http://localhost:8080/data/all');
//     const object1000 = await response2.json();
//     const response3 = await fetch('http://localhost:8080/data/fixed');
//     const object80_With_Position = await response3.json();

//     for (let i = 0; i < object80_With_Position.length; i++) {
//         let arrangeData = object80_With_Position[i]; // id and position
//         const idData = await fetch(`http://localhost:8080/data/_id/${arrangeData._id}`);
//         const foundData = await idData.json(); //id and position
        
//         // console.log(foundData);
        
//         if (foundData.status !== false) {
//             let data =   object1000.find((element) => element._id == arrangeData._id);
             
//              if (data == undefined || data == null) {
//                 arrangeData.name = foundData.name;
//                 // console.log(arrangeData.name);
//                 object1000.splice(arrangeData.position, 0, arrangeData);
//             }
//             else {
//                 arrangeData.name = data.name;
//                 let elePos = object1000.findIndex((object) => { object._id == data._id });
//                 object1000.splice(elePos, 1);
//                 object1000.splice(arrangeData.position, 0, arrangeData);
//             }
//         }
//         else {
//             continue;
//         }
//     }

//     let count = 0;
//         object1000.forEach(function(element) {
//             element.index = count;
//             count++;
//         });

//         file.writeFile("output.json",JSON.stringify(object1000),(err)=>{}); 
//     console.log("Total length "+object1000.length);
// }

// RunData();
