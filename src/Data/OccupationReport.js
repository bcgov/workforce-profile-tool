import ORRResultRow from '../Data/ORRResultRow'

const MANAGEMENT_START_ROW = 0
const MANAGEMENT_SUBTOTAL_ROW = 5
const NON_MANAGEMENT_START_ROW = 6
const NON_MANAGEMENT_SUBTOTAL_ROW = 13
const ALL_OCCUPATIONS_TOTAL_ROW = 14

class OccupationReport {
  constructor (lineArray, group, employeeType) {
    this._parseLineArray(lineArray, group, employeeType)
  }

  _parseLineArray (lineArray) {
    const managementLines = lineArray.slice(MANAGEMENT_START_ROW, MANAGEMENT_SUBTOTAL_ROW)
    const managementSubtotalLine = lineArray[MANAGEMENT_SUBTOTAL_ROW]
    const nonManagementLines = lineArray.slice(NON_MANAGEMENT_START_ROW, NON_MANAGEMENT_SUBTOTAL_ROW)
    const nonManagementSubtotalLine = lineArray[NON_MANAGEMENT_SUBTOTAL_ROW]
    const totalLine = lineArray[ALL_OCCUPATIONS_TOTAL_ROW]

    this._data = {
      total: new ORRResultRow(totalLine),
      management: {
        occupations: managementLines.map(line => new ORRResultRow(line)),
        total: new ORRResultRow(managementSubtotalLine)
      },
      nonManagement: {
        occupations: nonManagementLines.map(line => new ORRResultRow(line)),
        total: new ORRResultRow(nonManagementSubtotalLine)
      }
    }
  }
}

export default OccupationReport
