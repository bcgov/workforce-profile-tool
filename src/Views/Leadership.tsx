import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { LeadershipRawData } from '../@types/DataTypes'
import { parseFloatClean } from '../Services/formatter'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'

// TODO: Set + lock variables: ALL employees, BCPS ministry
const Leadership = (): JSX.Element => {
  const { leadershipData: data } = useDataManager()

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
      <GenericTable data={data} columns={columns} filename="leadership" />
    </GenericView>
  )
}

export default Leadership
