import { ORDERED_REGIONS } from '../Data/Region'
import ORRResultRow from '../Data/ORRResultRow'

const REGION_START_ROW = 15
const REGION_TOTAL_ROW = 18

class RegionReport {
  constructor (lineArray, group, employeeType) {
    this._parseLineArray(lineArray, group, employeeType)
  }

  _parseLineArray (lineArray) {
    const regionLines = lineArray.slice(REGION_START_ROW, REGION_TOTAL_ROW)
    const totalLine = lineArray.slice(REGION_TOTAL_ROW)[0]

    this._data = {
      total: new ORRResultRow(totalLine),
      regions: {}
    }

    ORDERED_REGIONS.forEach((region, index) => {
      this._data.regions[region.key] = new ORRResultRow(regionLines[index])
    })
  }
}

export default RegionReport
