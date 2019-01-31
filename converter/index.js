const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const name = 'road-crash-data'
const csv_file = './converter/ACT_Road_Crash_Data.csv'

init()
function init() {
  const content = fs.readFileSync(csv_file, 'utf8')

  Papa.parse(content, {
    header: true,
    complete: function(results) {
      writeFile(name, results.data)
    },
  })
}

function writeFile(name, data) {
  const title = name.split(' ').join('_') + '.json'
  fs.writeFile(
    path.resolve(__dirname, title),
    JSON.stringify(data, null, 0),
    err => {
      if (err) {
        console.log('err: ', err)
      }
      console.log('done')
    }
  )
}
