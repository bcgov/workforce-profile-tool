import OccupationReport from './OccupationReport'
import RegionReport from './RegionReport'
import { ORDERED_EMPLOYEE_TYPES } from './EmployeeType'

const REG_START_ROW = 3
const AUX_START_ROW = 22
const ALL_START_ROW = 41

class OccupationRegionReport {
  constructor (lineArray, group) {
    this._parseLineArray(lineArray)
    this.group = group
  }

  _parseLineArray (lineArray) {
    const regularLines = lineArray.slice(REG_START_ROW, AUX_START_ROW)
    const auxiliaryLines = lineArray.slice(AUX_START_ROW, ALL_START_ROW)
    const allLines = lineArray.slice(ALL_START_ROW)

    const orderedItems = [regularLines, auxiliaryLines, allLines]

    this._reports = {}

    ORDERED_EMPLOYEE_TYPES.forEach((employeeType, index) => {
      const key = employeeType.key
      const lines = orderedItems[index]
      this._reports[key] = {}
      this._reports[key].occupation = new OccupationReport(lines, this.group, employeeType)
      this._reports[key].region = new RegionReport(lines, this.group, employeeType)
    })
  }
}

export default OccupationRegionReport
