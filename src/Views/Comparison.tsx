import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { ComparisonRawData } from '../@types/DataTypes'
import { formatPercent } from '../Helpers/formatter'
import { StringParam, useQueryParam } from 'use-query-params'
import { filterData, sortData, useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'

const Comparison = (): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  useEffect(() => setLockedVars({}), [])

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

  // TODO: If app is slow, can useMemo on this one
  const data = sortData(filterData(unfilteredData, queryValues))

  const [ministryKey] = useQueryParam('Ministry_Key', StringParam)
  const ministry = VARIABLES.displayNameByKey(
    'Ministry_Key',
    queryValues.Ministry_Key
  ) // TODO: cleaner implementation of this

  const columns: ColumnWithClassName<ComparisonRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) =>
        VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
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
      data={unfilteredData}
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
