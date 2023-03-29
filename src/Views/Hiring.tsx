import { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { displayNameByKey } from '../Data/DataManager'
import { formatNumber, formatPercent } from '../Helpers/formatter'
import { HiringRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import { DataKeyEnum } from '../@types/DataKeyEnum'
import HiringGraph from '../Graphs/HiringGraph'

const Hiring = (): JSX.Element => {
  const { setLockedVars } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({ Year: ['2020'] }), [])

  const { data, dataDictionary, isLoading, error } =
    useDataQuery<HiringRawData>(DataKeyEnum.Hiring)

  console.log('data', data, 'isLoading', isLoading, 'error', error)

  const columns: ColumnWithClassName<HiringRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) => displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
    {
      id: 'DesGrp_Count_ORG',
      Header: 'Hired',
      accessor: (d) => formatNumber(d.DesGrp_Count_ORG),
      className: 'text-right',
    },
    {
      id: 'Total_Count_ORG',
      Header: '% of total',
      accessor: (d) => formatPercent(d.DesGrp_Count_ORG, 1, +d.Total_Count_ORG),
      className: 'text-right',
    },
  ]

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={data}
      title="Indicators of Progress — By Designated Group"
    >
      <HiringGraph
        data={data}
        dataDictionary={dataDictionary}
        title={'Indicators of Progress — By Designated Group'}
      />
      <GenericTable
        columns={columns}
        data={data}
        dataDictionary={dataDictionary}
        filename="hiring"
      />
    </GenericView>
  )
}

export default Hiring
