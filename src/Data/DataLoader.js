import * as d3 from 'd3'

const DATA_PATH_BASE_2018 = 'data/2018/'

class DataLoader {
  static async loadTextAsArray (url) {
    const response = await window.fetch(url)
    const text = await response.text()
    const array = text.split('\n')
    return array
  }

  static async loadCSV (url) {
    return d3.csv(url)
  }

  static async getIndicatorsOfProgressReport () {
    const url = `${DATA_PATH_BASE_2018}WP2018_Ind_Progress-2_Sep2018.csv`
    return DataLoader.loadCSV(url)
  }

  static async getComparisonReport () {
    const url = `${DATA_PATH_BASE_2018}WP2018_Comparison-2_updJUL20.csv`
    return DataLoader.loadCSV(url)
  }

  static async getLeadershipReport () {
    const url = `${DATA_PATH_BASE_2018}WP2018_Leadership.csv`
    return DataLoader.loadCSV(url)
  }

  static async getMinistryReport () {
    const url = `${DATA_PATH_BASE_2018}WP2018_Ministries-1.csv`
    return DataLoader.loadCSV(url)
  }

  static async getFlowReport () {
    const url = `${DATA_PATH_BASE_2018}WP2018_Flow-1_Oct2.csv`
    return DataLoader.loadCSV(url)
  }

  static async getOccupationRegionReport () {
    const url = `${DATA_PATH_BASE_2018}WP2018_Rep_Occ_Rgn_v_final.csv`
    return DataLoader.loadCSV(url)
  }

  static async getEmployeeCount () {
    const url = `${DATA_PATH_BASE_2018}WP2018_EmpCounts.csv`
    return DataLoader.loadCSV(url)
  }

  static async loadAllData () {
    const iopReport = await DataLoader.getIndicatorsOfProgressReport()
    const comparisonReport = await DataLoader.getComparisonReport()
    const leadershipReport = await DataLoader.getLeadershipReport()
    const ministryReport = await DataLoader.getMinistryReport()
    const orReport = await DataLoader.getOccupationRegionReport()
    const flowReport = await DataLoader.getFlowReport()
    const employeeCount = await DataLoader.getEmployeeCount()
    return {
      iopReport,
      comparisonReport,
      leadershipReport,
      ministryReport,
      orReport,
      flowReport,
      employeeCount
    }
  }
}

export default DataLoader
