import Papa from 'papaparse'

const COUNT_COL = 2
const NON_COUNT_COL = 3
const TOTAL_COUNT_COL = 4
const PERCENT_BCPS_COL = 5
const PERCENT_AVAIL_WORK_COL = 6
const EXPECTED_COUNT_COL = 7
const SHORTFALL_COUNT_COL = 8

class ORRResultRow {
  constructor (line) {
    const lineArray = Papa.parse(line).data[0]
    this.count = lineArray[COUNT_COL]
    this.nonCount = lineArray[NON_COUNT_COL]
    this.totalCount = lineArray[TOTAL_COUNT_COL]
    this.percentBCPS = lineArray[PERCENT_BCPS_COL]
    this.percentAvailWork = lineArray[PERCENT_AVAIL_WORK_COL]
    this.expectedCount = lineArray[EXPECTED_COUNT_COL]
    this.shortfallCount = lineArray[SHORTFALL_COUNT_COL]
  }
}

export default ORRResultRow
