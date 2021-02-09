import React, { Component } from 'react'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

const Progress = (): JSX.Element => {
  const title = 'Indicators of Progress — By Designated Group'
  const employeeCount = 1000 // useQueryParams
  const { indicatorsOfProgressData } = useDataManager()

  const codeOrder: Dictionary = {
    IND: 0,
    DIS: 1,
    VM: 2,
    WOM: 3,
    WOM_SM: 4,
    AS_TOTAL: 5,
  }

  const data = indicatorsOfProgressData
  if (data && data.length) {
    data.sort((a, b) => codeOrder[a.Des_Grp] - codeOrder[b.Des_Grp])
  }

  return (
    <div>
      <Title title={title} employeeCount={employeeCount} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          {/* <ProgressGraph data={data} title={title} /> */}
          {/* <ProgressTable data={data} /> */}
        </div>
      )}
    </div>
  )
}

export default Progress
