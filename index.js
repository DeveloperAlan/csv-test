const fs = require('fs');
const csv = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

const inputFile = 'input.csv';
const fileContent = fs.readFileSync(inputFile, 'utf-8');

const records = csv.parse(fileContent);

const integerValues = records[0].map(Number);

const evaluatedExpressions = records.slice(1).map(row => {
  return row.map(expression => {
    const evaluationExpression = expression.replace(/[A-K]/g, match => integerValues[match.charCodeAt(0) - 65]);
    return eval(evaluationExpression);
  });
});

const outputRecords = [integerValues, ...evaluatedExpressions];

const outputCsv = stringify(outputRecords);

const outputFile = 'output.csv';
fs.writeFileSync(outputFile, outputCsv);

console.log('Output CSV file generated successfully.');