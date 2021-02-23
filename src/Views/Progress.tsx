import React from 'react'

import { useDataManager } from '../Data/DataManager'
import Dictionary from '../@types/Dictionary'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

const Progress = (): JSX.Element => {
  const title = 'Indicators of Progress — By Designated Group'
  const { progressData: indicatorsOfProgressData } = useDataManager()

  const codeOrder: Dictionary<number> = {
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
      <Title title={title} />
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
