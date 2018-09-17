// const dirFile = "./name.txt";
const csvfile = "./Crimes_-_2001_to_present.csv";

let c1=0;
let c2=0;
let counter=0;
let indexPrimary;
let indexYear;
let indexDescription;
let arr = ["2001","2002","2003"];

// const fs = require('fs');
// const rr = fs.createReadStream('./Crimes_-_2001_to_present.csv');
// rr.on('readable', () => 
// {
//   console.log(`readable: ${rr.read()}`);
// });
// rr.on('end', () => 
// {
//   console.log('end');
// });
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
 input: fs.createReadStream('./Crimes_-_2001_to_present.csv')
});
rl.on('line', (line) => {
  var arr = line.split((/(".*?"|[^",]+)(?=,|$)+/g));



  function remove(array, element) {
    return array.filter(e => e !== element);
  }
  
  const filteredArray = remove(arr, ",");
  filteredArray_1 = remove(filteredArray, "");
  //filteredArray_1.toString();
  

  if(counter === 1)
  {
    //console.log(arr);
    indexPrimary = filteredArray_1.indexOf("Primary Type");
    indexYear = filteredArray_1.indexOf("Year");
    indexDescription = filteredArray_1.indexOf("Description");
   
  }   
  
  
  if(filteredArray_1[indexPrimary] === "THEFT")
  {
    if(filteredArray_1[indexDescription] === "OVER $500") 
    { 
      c1++; 
    }
    if(filteredArray_1[indexDescription] === "$500 AND UNDER")
    {
      c2++;
    }
  }
    var obj = {
        year: filteredArray_1[indexYear],
        th
       
    };        newArray.push(obj);
    console.log(newArray);
}

  /*if(arr.includes("THEFT")){
    if(arr.includes("OVER $500")) {
      console.log(arr);
    }  
  }
  if(arr.includes("THEFT")){
    if(arr.includes("$500 AND UNDER")) {
      console.log(arr);
    }  
  }*/



  //console.log(`Line from file: ${line}`);
  //console.log(typeof(line));
});