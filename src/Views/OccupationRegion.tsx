import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import {
  filterData,
  shortDisplayNameByKey,
  sortData,
  useDataManager,
} from '../Data/DataManager'
import GenericView from './GenericView'
import Dictionary from '../@types/Dictionary'
import { displayNameByKey } from '../Data/DataManager'
import OccupationRegionSubtable from '../Table/OccupationRegionSubtable'
import OccupationGraph from '../Graphs/OccupationRegionGraph'
import { OccupationRegionRawData } from '../@types/DataTypes'

export enum OccupationRegionEnum {
  Region = 'Region',
  Occupation = 'Occupation',
}

interface Props {
  viewType: OccupationRegionEnum
}

// TODO: If the ministry_key is BCPS, lock employee type to REG; otherwise don't
// lock variables
const OccupationRegion = ({ viewType }: Props): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  useEffect(() => {
    const employeeType = year === '2018' ? ['REG'] : ['ALL']

    const varsToLock: Dictionary<string[]> =
      queryValues.Ministry_Key === 'BCPS' ? {} : { Employee_Type: employeeType }
    setLockedVars(varsToLock)
  }, [queryValues.Ministry_Key, year])

  const dataKey = `WP${year}_Rep_Occ_Rgn`
  const url = metadata && metadata[dataKey] && year ? metadata[dataKey].url : ''

  // Load the raw data.
  const { isLoading, error, data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as OccupationRegionRawData[]
    },
    {
      enabled: !!(metadata && year),
      keepPreviousData: true,
    }
  )

  // Split the data
  const data = sortData(filterData(unfilteredData, queryValues))

  // Split the data
  const dataMap: Dictionary<OccupationRegionRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const tables = Object.keys(dataMap).map((k) => {
    const title = displayNameByKey('Des_Grp', k)
    const shortTitle = shortDisplayNameByKey('Des_Grp', k)
    return (
      <div key={k} className="mb-5">
        <h2 className="mb-0">{title}</h2>
        <OccupationRegionSubtable
          data={dataMap[k]}
          shortTitle={shortTitle}
          viewType={viewType}
        />
      </div>
    )
  })

  return (
    <GenericView
      title={`Representation — ${viewType}`}
      data={unfilteredData}
      isLoading={isLoading}
      error={error}
    >
      <OccupationGraph
        data={data}
        title={`Representation – ${viewType}`}
        organization={queryValues.Ministry_Key}
      />
      {tables}
    </GenericView>
  )
}

export default OccupationRegion
