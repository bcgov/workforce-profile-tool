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

import Loading from './Loading'

const Progress = (): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  const dataKey = `WP${year}_Ind_Progress`
  const url = metadata ? metadata[dataKey].url : ''

  // TODO: Bring error into GenericView
  const { isLoading, error, data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as ProgressRawData[]
    },
    {
      enabled: !!metadata,
    }
  )

  useEffect(() => setLockedVars({}), [])

  const columns: ColumnWithClassName<ProgressRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) =>
        VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
    {
      id: '2018_pc',
      Header: '2018, %',
      accessor: (d) => formatPercent(d['2018_pc'], 1, 100),
      className: 'text-right',
    },
    {
      id: '2020_pc',
      Header: '2020, %',
      accessor: (d) => formatPercent(d['2020_pc'], 1, 100),
      className: 'text-right',
    },
  ]

  // TODO: Bring these into GenericView
  if (isLoading) return <Loading />
  if (!unfilteredData || unfilteredData.length === 0) return <>No data yet.</>

  // TODO: If app is slow, can useMemo on this one
  const data = sortData(filterData(unfilteredData, queryValues))

  // TODO: Factor this out
  const codeOrder: Dictionary<number> = {
    // TODO: Factor this out
    IND: 0,
    DIS: 1,
    VM: 2,
    WOM: 3,
    WOM_SM: 4,
    AS_TOTAL: 5,
  }

  if (data && data.length) {
    data.sort((a, b) => codeOrder[a.Des_Grp] - codeOrder[b.Des_Grp])
  }

  return (
    <GenericView
      data={data}
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
