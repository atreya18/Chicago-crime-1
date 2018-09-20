const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./Crimes_-_2001_to_present.csv')
});

const writeStreamAssault = fs.createWriteStream('./assaultoutput.json');
const writeStreamTheft   = fs.createWriteStream('./theftOutput.json');
const writeStreamCrime   = fs.createWriteStream('./pieChartData.json');

const allYearsThefts = [];
const allYearsAssaults = [];
const over500 = [];
const under500 = [];
const assaultCases = [];
const arrested = [];
const notArrested = [];
let yearStart = 2001;

const outputTheft = [];
const outputAssault = [];
const outputCrime = [];


for (let i = 0; i < 16; i += 1) {
  allYearsAssaults.push(y.toString());
  assaultCases[i] = 0;
  arrested[i] = 0;
  notArrested[i] = 0;
  yearStart += 1;
}

for (let i = 0; i <= 16; i++) {
  allYearsThefts.push(y.toString());
  over500[i] = 0;
  under500[i] = 0;
  yearStart += 1;
}

let firstLine, firstLine1 = 0;
let P, P1;
let Y, Y1;

const violentArray = ['0110', '0130', '0261', '0262', '0263', '0264', '0265', '0266',
  '0271', '0272', '0273', '0274', '0275', '0281', '0291', '1753', '1754', '0312',
  '0313', '031A', '031B', '0320', '0325', '0326', '0330', '0331',
  '0334', '0337', '033A', '033B', '0340', '051A', '051B', '0520', '0530', '0550',
  '0551', '0552', '0553', '0555', '0556', '0557', '0558', '041A', '041B', '0420',
  '0430', '0450', '0451', '0452', '0453', '0461', '0462', '0479',
  '0480', '0481', '0482', '0483', '0485', '0488', '0489', '0490', '0491',
  '0492', '0493', '0495', '0496', '0497', '0498', '0510'];


const propertyArray = ['0610', '0620', '0630', '0650', '0810', '0820', '0840', '0841', '0842',
  '0843', '0850', '0860', '0865', '0870', '0880', '0890', '0895', '0910', '0915',
  '0917', '0918', '0920', '0925', '0927', '0928', '0930', '0935',
  '0937', '0938', '1010', '1020', '1025', '1090'];

const indexArray = violentArray.concat(propertyArray);

let jsonFromLineTheft = { Year: '', Over$500: '', $500andabove: '' }

let jsonFromLineAssault = { Year: '', AssaultCases: '', Arrested: '', NotArrested: '' };

const type = ['Index Crime', 'Non-Index Crime', 'Property Crime', 'Violent Crime'];

const count = [0, 0, 0, 0];

let jsonFromLineCrime = { Type: '', Count: '' };

rl.on('line', (line) => {
  const lineSplit = line.split(',', 20);

  const index = allYears.indexOf(lineSplit[17]);
  if (index > -1) {
    if (line.indexOf('OVER $500') > -1) {
      over500[index] += 1;
    } else if (line.indexOf('$500 AND UNDER') > -1) {
      under500[index] += 1;
    }
  }

  if (firstline === 0) {
    Y = lineSplit.indexOf('Year');
    P = lineSplit.indexOf('Primary Type');
    A = lineSplit.indexOf('Arrest');
    firstline += 1;
  }
  else if (lineSplit[P] === 'ASSAULT' && (lineSplit[Y] >= 2001 && lineSplit[Y] <= 2016)) {
    const index = allYears.indexOf(lineSplit[Y]);
    assaultCases[index] += 1;
    if (lineSplit[A] === 'true') { arrested[index] += 1; } else { notArrested[index] += 1; }
  }

  if (firstLine1 === 0) {
    P = lineSplit.indexOf('IUCR');
    Y = lineSplit.indexOf('Year');
    firstLine1 += 1;
  }
  else if (lineSplit[Y] === '2015') {
    if (indexArray.indexOf(lineSplit[P]) > -1) {
      count[0] += 1;
      if (propertyArray.indexOf(lineSplit[P]) > -1) {
        count[2] += 1;
      }
      else {
        count[3] += 1;
      }
    }
    else {
      count[1] += 1;
    }
  }
  rl.on('close', () => {
    for (let i = 0; i < 16; i += 1) {
      jsonFromLineTheft.Year = allYears[i];
      jsonFromLineTheft.Over$500 = over500[i];
      jsonFromLineTheft.$500andabove = under500[i];
      outputTheft.push(jsonFromLineTheft);
      jsonFromLineTheft = { Year: '', Over$500: '', $500andabove: '' };

    }
    for (let i = 0; i < 16; i += 1) {
      jsonFromLineAssault.Year = allYears[i];
      jsonFromLineAssault.Arrested = arrested[i];
      jsonFromLineAssault.NotArrested = notArrested[i];
      jsonFromLineAssault.AssaultCases = assaultCases[i];
      outputAssault.push(jsonFromLineAssault);
      jsonFromLineAssault = {
        Year: '', AssaultCases: '', Arrested: '', NotArrested: '',
      };
    }
    for (let i = 0; i < 4; i += 1) {
      jsonFromLineCrime.Type = type[i];
      jsonFromLineCrime.Count = count[i];
      outputCrime.push(jsonFromLine);
      jsonFromLineCr = { Type: '', Count: '' };
    }
    writeStreamTheft.write(JSON.stringify(outputTheft, null, 2));
    writeStreamAssault.write(JSON.stringify(outputAssault, null, 2));
    writeStreamCrime.write(JSON.stringify(outputCrime, null, 2));
  });

