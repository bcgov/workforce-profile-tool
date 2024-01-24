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
  const { year } = useDataManager()

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
      id: 'Hiring_PC_Total',
      Header: '% of total',
      accessor: (d) => formatPercent(d.DesGrp_Count_ORG, 1, +d.Total_Count_ORG),
      className: 'text-right',
    },
  ]

  return (
    year !== '2018' ? (
      <>
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
      </>
    ) : (
      <div className="alert alert-warning Shadow" role="alert">
        <h2>Data Unavailable</h2>
        <p>Data is unavailable for {year}.</p>
      </div>
    )
  )
}

export default Hiring
