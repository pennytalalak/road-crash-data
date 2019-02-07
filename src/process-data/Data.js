import csvFile from '../data/ACT_Road_Crash_Data.csv'
import { csv } from 'd3-fetch'

export function _processData(props) {
  csv(csvFile).then(x => {
    const points = x.reduce((accu, curr) => {
      accu.push({
        position: [Number(curr.LONGITUDE), Number(curr.LATITUDE)],
        pickup: true,
      })
      return accu
    }, [])
    return points
  })
}
