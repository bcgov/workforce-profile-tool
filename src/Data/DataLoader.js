import * as d3 from 'd3'
// import FlowReport from './FlowReport'

const DATA_PATH_BASE = 'data/2015/'

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
    const url = `${DATA_PATH_BASE}WP2015_Ind_Progress-2.csv`
    return DataLoader.loadCSV(url)
  }

  static async getComparisonReport () {
    const url = `${DATA_PATH_BASE}WP2015_Comparison-2.csv`
    return DataLoader.loadCSV(url)
  }

  static async getLeadershipReport () {
    const url = `${DATA_PATH_BASE}WP2015_Leadership.csv`
    return DataLoader.loadCSV(url)
  }

  static async getMinistryReport () {
    const url = `${DATA_PATH_BASE}WP2018_Ministries.csv`
    return DataLoader.loadCSV(url)
  }

  static async getFlowReport () {
    const url = `${DATA_PATH_BASE}WP2015_Flow-1.csv`
    return DataLoader.loadCSV(url)
  }

  static async getOccupationRegionReport () {
    const url = `${DATA_PATH_BASE}WP2018_Rep_Occ_Rgn_v_final.csv`
    return DataLoader.loadCSV(url)
  }

  static async loadAllData () {
    const iopReport = await DataLoader.getIndicatorsOfProgressReport()
    const comparisonReport = await DataLoader.getComparisonReport()
    const leadershipReport = await DataLoader.getLeadershipReport()
    const ministryReport = await DataLoader.getMinistryReport()
    const orReport = await DataLoader.getOccupationRegionReport()
    const flowReport = await DataLoader.getFlowReport()
    return {
      iopReport,
      comparisonReport,
      leadershipReport,
      ministryReport,
      orReport,
      flowReport
    }
  }
}

export default DataLoader
