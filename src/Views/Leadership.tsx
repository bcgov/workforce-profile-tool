import React, { useEffect } from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { LeadershipRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import LeadershipGraph from '../Graphs/LeadershipGraph'

const Leadership = (): JSX.Element => {
  const { setLockedVars, year } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => {
    if (year === '2018') {
      setLockedVars({ Employee_Type: ['ALL'], Ministry_Key: ['BCPS'] })
    } else {
      setLockedVars({ Ministry_Key: ['BCPS'] })
    }
  }, [year])

  const dataKey = `WP${year}_Leadership`
  const { data, isLoading, error } = useDataQuery<LeadershipRawData>(dataKey)

  const columns: ColumnWithClassNameAndFooter<LeadershipRawData>[] = [
    {
      accessor: (r: LeadershipRawData) =>
        displayNameByKey('Des_Grp', r.Des_Grp),
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
      data={data}
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
