import React, { useEffect } from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { LeadershipRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { YEAR_PLACEHOLDER, useDataQuery } from '../Data/useDataQuery'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import TableTooltip from '../Table/TableTooltip'

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

  const dataKey = `WP${YEAR_PLACEHOLDER}_Leadership`
  const { data, isLoading, error } = useDataQuery<LeadershipRawData>(
    dataKey,
    year
  )

  const columns: ColumnWithClassNameAndFooter<LeadershipRawData>[] = [
    {
      accessor: (r: LeadershipRawData) =>
        displayNameByKey('Des_Grp', r.Des_Grp),
      Header: 'Designated Group',
      id: 'Des_Grp',
    },
    {
      id: 'Executive',
      accessor: (r) => formatPercent(r.Executive, 1, 100),
      Header: (
        <TableTooltip
          title="Executive Leadership, %"
          tooltipKey="leadership-executive-leadership"
        />
      ),
      className: 'text-right',
    },
    {
      id: 'Management_Band',
      accessor: (r) => formatPercent(r.Management_Band, 1, 100),
      className: 'text-right',
      Header: (
        <TableTooltip
          title="Management Band Leadership, %"
          tooltipKey="leadership-management-band-leadership"
        />
      ),
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
