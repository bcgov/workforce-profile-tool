import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { filterData, sortData, useDataManager } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import ProgressGraph from '../Graphs/ProgressGraph'

const Progress = (): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({}), [])

  const dataKey = `WP${year}_Ind_Progress`
  const url = metadata ? metadata[dataKey].url : ''

  // Load the raw data.
  const { isLoading, error, data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as ProgressRawData[]
    },
    {
      enabled: !!metadata,
    }
  )

  // TODO: If app is slow, can useMemo on this one
  const data = sortData(filterData(unfilteredData, queryValues))

  const columns: ColumnWithClassName<ProgressRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) =>
        VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
  ]

  const dataKeys = Object.keys(data[0]).filter((key) => key.endsWith('_pc'))

  dataKeys.forEach((dataKey) => {
    columns.push({
      id: dataKey,
      Header: `${dataKey.split('_')[0]}, %`,
      accessor: (d) =>
        formatPercent((d as Dictionary<string>)[dataKey], 1, 100),
      className: 'text-right',
    })
  })

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={unfilteredData}
      title="Indicators of Progress — By Designated Group"
    >
      <ProgressGraph
        data={data}
        title={'Indicators of Progress — By Designated Group'}
      />
      <GenericTable columns={columns} data={data} filename="progress" />
    </GenericView>
  )
}

export default Progress
