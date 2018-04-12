import * as d3 from 'd3'

export const GROUPS_OF_INTEREST = {
  'aboriginal': {
    'key': 'aboriginal',
    'title': 'Aboriginal',
    'filename': 'aboriginal'
  },
  'personsWithDisabilities': {
    'key': 'personsWithDisabilities',
    'title': 'Persons with Disabilities',
    'filename': 'persons-disabilities'
  },
  'visibleMinorities': {
    'key': 'visibleMinorities',
    'title': 'Visible Minorities',
    'filename': 'visible-minorities'
  },
  'women': {
    'key': 'women',
    'title': 'Women',
    'filename': 'women'
  }
}

const DATA_PATH_BASE = 'data/2015/'

const loadData = async (key, csvPath) => {
  return new Promise((resolve, reject) => {
    d3.csv(csvPath, (error, data) => {
      if (error) reject(error)
      resolve({ key, data })
    })
  })
}

export const getFlowReport = async (group) => {
  const data = await loadData(`${DATA_PATH_BASE}flow-report-${group.filename}.csv`)
  console.log('getFlowReport', data)
  return data
}

export const getOccupationRegionReport = async (group) => {
  const data = await loadData(`${DATA_PATH_BASE}occupation-region-${group.filename}.csv`)
  console.log('getOccupationRegionReport', data)
  return data
}
