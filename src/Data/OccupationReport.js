const COUNT_COL = 2
const NON_COUNT_COL = 3
const TOTAL_COUNT_COL = 4
const PERCENT_BCPS_COL = 5
const PERCENT_AVAIL_WORK_COL = 6
const EXPECTED_COUNT_COL = 7
const SHORTFALL_COUNT_COL = 8
const MANAGEMENT_START_ROW = 0
const MANAGEMENT_SUBTOTAL_ROW = 5
const NON_MANAGEMENT_START_ROW = 6
const NON_MANAGEMENT_SUBTOTAL_ROW = 13
const ALL_OCCUPATIONS_TOTAL_ROW = 14
const REGION_START_ROW = 15
const REGION_TOTAL_ROW = 18

class OccupationReport {
  constructor (lineArray, group, employeeType) {
    this._parseLineArray(lineArray, group, employeeType)
  }

  _parseLineArray (lineArray) {

  }
}

export default OccupationReport
