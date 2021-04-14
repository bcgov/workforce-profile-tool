import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { ComparisonRawData } from '../@types/DataTypes'
import { formatPercent } from '../Helpers/formatter'
import { StringParam, useQueryParam } from 'use-query-params'
import { filterData, sortData, useDataManager } from '../Data/DataManager'
import { displayNameByKey } from '../Data/DataManager'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import { useDataQuery } from '../Data/useDataQuery'

const Comparison = (): JSX.Element => {
  const { setLockedVars, year, queryValues } = useDataManager()

  useEffect(() => setLockedVars({}), [])

  const dataKey = `WP${year}_Comparison`

  // const data = useDataQuery

  // const url = metadata ? metadata[dataKey].url : ''

  // Load the raw data.
  // const { isLoading, error, data: unfilteredData } = useQuery(
  //   dataKey,
  //   async () => {
  //     return (await d3.csv(url)) as ComparisonRawData[]
  //   },
  //   {
  //     enabled: !!metadata,
  //     keepPreviousData: true,
  //   }
  // )

  // const data = sortData(filterData(unfilteredData, queryValues))

  const { data, isLoading, error } = useDataQuery<ComparisonRawData>(dataKey)

  const [ministryKey] = useQueryParam('Ministry_Key', StringParam)
  const ministry = displayNameByKey('Ministry_Key', queryValues.Ministry_Key)

  const columns: ColumnWithClassNameAndFooter<ComparisonRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) => displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
    {
      id: 'Employees_BCPS',
      Header: `${ministry}, %`,
      accessor: (d) => formatPercent(d['Employees_BCPS'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'Available_Workforce_BCPS',
      Header: 'Available Workforce, %',
      accessor: (d) => formatPercent(d['Available_Workforce_BCPS'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'Employees_BC_Population',
      Header: 'BC Population, %',
      accessor: (d) => formatPercent(d['Employees_BC_Population'], 1, 100),
      className: 'text-right',
    },
  ]

  return (
    <GenericView
      data={data}
      error={error}
      isLoading={isLoading}
      title={'Comparison with Provincial Workforce'}
    >
      <ComparisonGraph
        data={data}
        ministry={ministryKey}
        title={'Comparison with Provincial Workforce'}
        year={year || ''}
      />
      <GenericTable data={data} columns={columns} filename={'comparison'} />
    </GenericView>
  )
}

export default Comparison
