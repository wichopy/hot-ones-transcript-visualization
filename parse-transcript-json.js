const data = require('./data.json')

console.log(data.timedtext.body.p.length)

const datapoint = {
  ts: null,
  text: '',
}

const records = []

// Parse data
data.timedtext.body.p.forEach((part, i) => {
  if (part.s) {
    let beginningTS = +part['_t']
    if (part.s.forEach) {
      part['s'].forEach(string => {
        records.push({ ...datapoint, ts: string['_t'] ? beginningTS + Number(string['_t']) : beginningTS, text: string['__text'] })
      })
    } else {
      records.push({ ...datapoint, ts: part.s['_t'] ? beginningTS + Number(part.s['_t']) : beginningTS, text: part.s['__text'] })
    }
  }
})

module.export = records

// Write to csv
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//   path: './transcript.csv',
//   header: [
//     { id: 'ts', title: 'Timestamp' },
//     { id: 'text', title: 'Word' }
//   ]
// });

// csvWriter.writeRecords(records)       // returns a promise
//   .then(() => {
//     console.log('...Done');
//   });