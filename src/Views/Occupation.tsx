import { ArrayParam, useQueryParam } from 'use-query-params'
import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import { filterData, sortData, useDataManager } from '../Data/DataManager'
import GenericView from './GenericView'
import Dictionary from '../@types/Dictionary'
import { VARIABLES } from '../Variables/VariableManager'
import { OccupationRegionRawData } from '../@types/DataTypes'
import OccupationSubtable from '../Table/OccupationSubtable'
import OccupationGraph from '../Graphs/OccupationGraph'

// TODO: If the ministry_key is BCPS, lock employee type to REG; otherwise don't
// lock variables
const Occupation = (): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  const [ministryQueryVars] = useQueryParam('Ministry_Key', ArrayParam)

  useEffect(() => {
    const employeeType = year === '2018' ? ['REG'] : ['ALL']

    const varsToLock: Dictionary<string[]> = ministryQueryVars?.includes('BCPS')
      ? {}
      : { Employee_Type: employeeType }
    setLockedVars(varsToLock)
  }, [ministryQueryVars, year])

  const dataKey = `WP${year}_Rep_Occ_Rgn`
  const url = metadata ? metadata[dataKey].url : ''

  // Load the raw data.
  const { isLoading, error, data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as OccupationRegionRawData[]
    },
    {
      enabled: !!metadata,
    }
  )

  const data = sortData(filterData(unfilteredData, queryValues))

  // Split the data
  const dataMap: Dictionary<OccupationRegionRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const tables = Object.keys(dataMap).map((k) => {
    const title = VARIABLES.displayNameByKey('Des_Grp', k)
    const shortTitle = VARIABLES.shortDisplayNameByKey('Des_Grp', k)
    return (
      <div key={k} className="mb-5">
        <h2>{title}</h2>
        <OccupationSubtable data={dataMap[k]} shortTitle={shortTitle} />
      </div>
    )
  })

  return (
    <GenericView
      data={unfilteredData}
      error={error}
      isLoading={isLoading}
      title={'Representation — Occupation'}
    >
      <OccupationGraph data={data} title={'Representation — Occupation'} />
      {tables}
    </GenericView>
  )
}

export default Occupation
