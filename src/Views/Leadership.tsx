import React, { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { LeadershipRawData } from '../@types/DataTypes'
import { parseFloatClean } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import LeadershipGraph from '../Graphs/LeadershipGraph'

const Leadership = (): JSX.Element => {
  const { leadershipData: data, setLockedVars, year } = useDataManager()

  useEffect(() => {
    if (year === '2018') {
      setLockedVars({ Employee_Type: ['ALL'], Ministry_Key: ['BCPS'] })
    } else {
      setLockedVars({ Ministry_Key: ['BCPS'] })
    }
  }, [year])

  const columns: ColumnWithClassName<LeadershipRawData>[] = [
    {
      accessor: (r: LeadershipRawData) =>
        VARIABLES.displayNameByKey('Des_Grp', r.Des_Grp),
      Header: 'Designated Group',
      id: 'Des_Grp',
    },
    {
      accessor: (r: LeadershipRawData) => parseFloatClean(r.Executive),
      className: 'text-right',
      Header: 'Executive Leadership, %',
    },
    {
      accessor: (r: LeadershipRawData) => parseFloatClean(r.Management_Band),
      className: 'text-right',
      Header: 'Management Band Leadership, %',
    },
  ]

  return (
    <GenericView data={data} title={'Leadership by Type'}>
      <LeadershipGraph title={'Leadership by Type'} />
      <GenericTable data={data} columns={columns} filename="leadership" />
    </GenericView>
  )
}

export default Leadership
