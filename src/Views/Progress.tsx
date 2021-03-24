import React, { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { formatPercent } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import ProgressGraph from '../Graphs/ProgressGraph'

const Progress = (): JSX.Element => {
  const { progressData: data, setLockedVars } = useDataManager()

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
      title="Indicators of Progress — By Designated Group"
      data={data}
    >
      <ProgressGraph title={'Indicators of Progress — By Designated Group'} />
      <GenericTable columns={columns} data={data} filename="progress" />
    </GenericView>
  )
}

export default Progress
