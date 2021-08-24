import React, { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { displayNameByKey } from '../Data/DataManager'
import { formatNumber } from '../Helpers/formatter'
import { FlowRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import { DataKeyEnum } from '../@types/DataKeyEnum'
import FlowReportGraph from '../Graphs/FlowReportGraph'

const FlowReport = (): JSX.Element => {
  const { setLockedVars } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({}), [])

  const { data, dataDictionary, isLoading, error } = useDataQuery<FlowRawData>(
    DataKeyEnum.Flow
  )

  console.log('data ==>', data)

  const columns: ColumnWithClassName<FlowRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) => displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
    {
      id: 'Variable_Type',
      Header: 'Variable Type',
      accessor: (d) => d['Variable_Type'] || '',
    },
    {
      id: 'Display_Type',
      Header: 'Display Type',
      accessor: (d) => d['Display_Type'] || '',
    },
    {
      id: 'DesGrp_Count_ORG',
      Header: 'Des. Grp. (Org)',
      accessor: (d) => formatNumber(d['DesGrp_Count_ORG']) || '',
    },
    {
      id: 'NonDesGrp_Count_ORG',
      Header: 'Non-Des. Grp. (Org)',
      accessor: (d) => formatNumber(d['NonDesGrp_Count_ORG']) || '',
    },
    {
      id: 'Total_Count_ORG',
      Header: 'Total (Org)',
      accessor: (d) => formatNumber(d['Total_Count_ORG']) || '',
    },
  ]

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={data}
      title="Flow Report"
    >
      {/* <FlowReportGraph
        data={data}
        dataDictionary={dataDictionary}
        title={'Flow Report'}
      /> */}
      <FlowReportGraph data={data} />
      <GenericTable
        columns={columns}
        data={data}
        dataDictionary={dataDictionary}
        filename="progress"
      />
    </GenericView>
  )
}

export default FlowReport
