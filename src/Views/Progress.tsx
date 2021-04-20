import React, { useEffect } from 'react'

import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'
import { useDataManager } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { displayNameByKey } from '../Data/DataManager'
import Dictionary from '../@types/Dictionary'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import ProgressGraph from '../Graphs/ProgressGraph'
import { useDataQuery } from '../Data/useDataQuery'

const Progress = (): JSX.Element => {
  const { setLockedVars, year } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({}), [])

  const dataKey = `WP${year}_Ind_Progress`
  const { data, isLoading, error } = useDataQuery<ProgressRawData>(dataKey)

  const columns: ColumnWithClassNameAndFooter<ProgressRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) => displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
  ]

  const dataKeys =
    data && data.length > 0
      ? Object.keys(data[0]).filter((key) => key.endsWith('_pc'))
      : []

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
