// const readline = require('readline');
// const fs = require('fs');

// const rl = readline.createInterface({
//     input: fs.createReadStream('./Crimes_-_2001_to_present.csv')
// })

// const myWriteStream = fs.createWriteStream('./theftOutput.json');

// const allYears = [];
// const over500 = [];
// const under500 =[];
// let y = 2001;

// for (let i = 0; i<=16; i++)
// {
//     allYears.push(y.toString());
//     over500[i] = 0;
//     under500[i] = 0;
//     y+=1;
// }

// const output = [];

// let jsonFromLine = { Year: '', Over$500: '', $500andabove: ''}

// rl.on('line', (line) => {
//     const lineSplit = line.split(',', 20);

//     const index = allYears.indexOf(lineSplit[17]);
//     if (index >-1) {
//         if (line.indexOf('OVER $500') > -1) {
//             over500[index]+= 1;
//         } else if (line.indexOf('$500 AND UNDER' ) > -1) {
//           under500[index]+= 1;
//         }
//     }
// });

// rl.on('close', () => {
//     for (let i=0; i<16; i+=1) {
//         jsonFromLine.Year = allYears[i];
//         jsonFromLine.Over$500 = over500[i];
//         jsonFromLine.$500andabove = under500[i];
//         output.push(jsonFromLine);
//         jsonFromLine = { Year: '', Over$500: '', $500andabove : ''};

//     }
//     myWriteStream.write(JSON.stringify(output, null, 2));


// })


module.exports{

theftReturn: function(lineSplit) {

const lineSplit = line.split(',', 20);

const allYearsThefts = [];
const over500 = [];
const under500 = [];
let yearStart = 2001;
const outputTheft = [];

for (let i = 0; i <= 16; i++) {
    allYearsThefts.push(yearStart.toString());
    over500[i] = 0;
    under500[i] = 0;
    yearStart += 1;
  }

let jsonFromLineTheft = { Year: '', Over$500: '', $500andabove: '' }

const indexTheft = allYearsThefts.indexOf(lineSplit[17]);
  if (indexTheft > -1) {
    if (line.indexOf('OVER $500') > -1) {
      over500[indexTheft] += 1;
    } else if (line.indexOf('$500 AND UNDER') > -1) {
      under500[indexTheft] += 1;
    }
  }
  return lineSplit; 
}
}