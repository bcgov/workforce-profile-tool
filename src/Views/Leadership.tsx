import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect } from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { filterData, sortData, useDataManager } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { LeadershipRawData } from '../@types/DataTypes'
import { VARIABLES } from '../Variables/VariableManager'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import LeadershipGraph from '../Graphs/LeadershipGraph'

const Leadership = (): JSX.Element => {
  const { setLockedVars, metadata, year, queryValues } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => {
    if (year === '2018') {
      setLockedVars({ Employee_Type: ['ALL'], Ministry_Key: ['BCPS'] })
    } else {
      setLockedVars({ Ministry_Key: ['BCPS'] })
    }
  }, [year])

  const dataKey = `WP${year}_Leadership`
  const url = metadata ? metadata[dataKey].url : ''

  // Load the raw data.
  const { isLoading, error, data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as LeadershipRawData[]
    },
    {
      enabled: !!metadata,
      keepPreviousData: true,
    }
  )

  // TODO: If app is slow, can useMemo on this one
  const data = sortData(filterData(unfilteredData, queryValues))

  const columns: ColumnWithClassNameAndFooter<LeadershipRawData>[] = [
    {
      accessor: (r: LeadershipRawData) =>
        VARIABLES.displayNameByKey('Des_Grp', r.Des_Grp),
      Header: 'Designated Group',
      id: 'Des_Grp',
    },
    {
      accessor: (r: LeadershipRawData) => formatPercent(r.Executive, 1, 100),
      className: 'text-right',
      Header: 'Executive Leadership, %',
    },
    {
      accessor: (r: LeadershipRawData) =>
        formatPercent(r.Management_Band, 1, 100),
      className: 'text-right',
      Header: 'Management Band Leadership, %',
    },
  ]

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={unfilteredData}
      title={'Leadership by Type'}
    >
      <LeadershipGraph
        data={data}
        title={'Leadership by Type'}
        year={year || ''}
      />
      <GenericTable data={data} columns={columns} filename="leadership" />
    </GenericView>
  )
}

export default Leadership
