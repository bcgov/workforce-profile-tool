// import * as d3 from 'd3'

const DATA_PATH_BASE = '/data/2015/'

class DataLoader {
  static async loadTextAsArray (url) {
    const response = await window.fetch(url)
    const text = await response.text()
    const array = text.split('\n')
    return array
  }

  static getFlowReport (group) {
    const url = `${DATA_PATH_BASE}flow-report-${group.filename}.csv`
    return DataLoader.loadTextAsArray(url)
  }

  static async getOccupationRegionReport (group) {
    const url = `${DATA_PATH_BASE}occupation-region-${group.filename}.csv`
    return DataLoader.loadTextAsArray(url)
  }
}

export default DataLoader
