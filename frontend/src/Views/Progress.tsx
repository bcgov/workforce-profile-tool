import { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { ProgressRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import Dictionary from '../@types/Dictionary'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import ProgressGraph from '../Graphs/ProgressGraph'
import { DataKeyEnum } from '../@types/DataKeyEnum'

const Progress = (): JSX.Element => {
  const { setLockedVars, year } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({}), [])

  const { data, dataDictionary, isLoading, error } =
    useDataQuery<ProgressRawData>(DataKeyEnum.Progress)

  const columns: ColumnWithClassName<ProgressRawData>[] = [
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
      Header: `${dataKey.split('_')[0]} %`,
      accessor: (d) =>
        formatPercent((d as Dictionary<string>)[dataKey], 1, 100),
      className: 'text-end',
    })
  })

  const additionalDefinitions =
    year === '2022'
      ? [
        {
          term: 'NA',
          definition:
            'The 2020 comparator is not provided as the BC Stats definition of Persons with Disabilities changed between 2020 and 2022.',
        },
      ]
      : []

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={data}
      title="Indicators of Progress — By Designated Group"
    >
      <ProgressGraph
        data={data}
        dataDictionary={dataDictionary}
        title={'Indicators of Progress — By Designated Group'}
      />
      <GenericTable
        columns={columns}
        data={data}
        dataDictionary={dataDictionary}
        filename="progress"
        additionalDefinitions={additionalDefinitions}
      />
    </GenericView>
  )
}

export default Progress
