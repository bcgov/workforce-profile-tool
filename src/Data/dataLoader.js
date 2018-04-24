import { GROUPS } from './Group'
import OccupationRegionReport from './OccupationRegionReport'
// import FlowReport from './FlowReport'

const DATA_PATH_BASE = '/data/2015/'

class DataLoader {
  static async loadTextAsArray (url) {
    const response = await window.fetch(url)
    const text = await response.text()
    const array = text.split('\n')
    return array
  }

  static async getFlowReport (group) {
    const url = `${DATA_PATH_BASE}flow-report-${group.filename}.csv`
    return DataLoader.loadTextAsArray(url)
  }

  static async getOccupationRegionReport (group) {
    const url = `${DATA_PATH_BASE}occupation-region-${group.filename}.csv`
    return DataLoader.loadTextAsArray(url)
  }

  static async loadAllData () {
    console.log(GROUPS)

    const occupationRegionReports = {}
    const flowReports = {}
    for (const group of Object.values(GROUPS)) {
      console.log('group', group)
      const key = group.key

      const orrLineArray = await this.getOccupationRegionReport(group)
      const orrData = new OccupationRegionReport(orrLineArray)
      occupationRegionReports[key] = orrData

      // const flowLineArray = await this.getFlowReport(group)
      // const flowData = new FlowReport(flowLineArray)
      // occupationRegionReports[key] = flowData
    }
    return {
      occupationRegionReports,
      flowReports
    }
  }
}

export default DataLoader
