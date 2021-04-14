import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import {
  buildMinistryData,
  sortData,
  useDataManager,
} from '../Data/DataManager'
import { ComparisonRawData } from '../@types/DataTypes'
import GenericView from './GenericView'
import OrganizationGraph from '../Graphs/OrganizationGraph'

const Organization = (): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  useEffect(() => setLockedVars({ Ministry_Key: ['BCPS'] }), [])

  const dataKey = `WP${year}_Comparison`
  const url = metadata ? metadata[dataKey].url : ''

  // Load the raw data.
  const { isLoading, error, data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as ComparisonRawData[]
    },
    {
      enabled: !!metadata,
      keepPreviousData: true,
    }
  )

  const data = sortData(buildMinistryData(unfilteredData, queryValues))

  return (
    <GenericView data={unfilteredData} error={error} isLoading={isLoading}>
      <h1>Organizations</h1>
      <OrganizationGraph data={data} />
    </GenericView>
  )
}

export default Organization
