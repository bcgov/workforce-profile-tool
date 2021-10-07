import React, { useEffect } from 'react'

import { DataKeyEnum } from '../@types/DataKeyEnum'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { FlowRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import Dictionary from '../@types/Dictionary'
import FlowReportSubtable from '../Table/FlowReportSubtable'
import GenericView from './GenericView'

const FlowReport = (): JSX.Element => {
  const { setLockedVars } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({}), [])

  const { data, dataDictionary, isLoading, error } = useDataQuery<FlowRawData>(
    DataKeyEnum.Flow
  )

  // Split the data
  const dataMap: Dictionary<FlowRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const tables = Object.keys(dataMap).map((k) => {
    const title = displayNameByKey('Des_Grp', k)
    const shortTitle = shortDisplayNameByKey('Des_Grp', k)
    return (
      <div key={k} className="mb-5">
        <h2 className="mb-0">{title}</h2>
        <FlowReportSubtable
          data={dataMap[k]}
          dataDictionary={dataDictionary}
          shortTitle={shortTitle}
        />
      </div>
    )
  })

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={data}
      title="Flow Report"
    >
      <hr />
      {tables}
    </GenericView>
  )
}

export default FlowReport
