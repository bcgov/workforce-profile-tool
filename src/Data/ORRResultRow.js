import Papa from 'papaparse'

const NAME_COL = 1
const COUNT_COL = 2
const NON_COUNT_COL = 3
const TOTAL_COUNT_COL = 4
const PERCENT_BCPS_COL = 5
const PERCENT_AVAILABLE_COL = 6
const EXPECTED_COUNT_COL = 7
const SHORTFALL_COUNT_COL = 8

class ORRResultRow {
  constructor (line, additionalData = {}) {
    const lineArray = Papa.parse(line).data[0]
    this.data = {}
    this.data.name = lineArray[NAME_COL]
    this.data.count = lineArray[COUNT_COL]
    this.data.nonCount = lineArray[NON_COUNT_COL]
    this.data.totalCount = lineArray[TOTAL_COUNT_COL]
    this.data.percentBCPS = lineArray[PERCENT_BCPS_COL]
    this.data.percentAvailable = lineArray[PERCENT_AVAILABLE_COL]
    this.data.expectedCount = lineArray[EXPECTED_COUNT_COL]
    this.data.shortfallCount = lineArray[SHORTFALL_COUNT_COL]

    Object.keys(additionalData).forEach(k => {
      this.data[k] = additionalData[k]
    })
  }

  asObject () {
    return this.data
  }
}

export default ORRResultRow
