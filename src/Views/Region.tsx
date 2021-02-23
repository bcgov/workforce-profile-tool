import React from 'react'

import { useDataManager } from '../Data/DataManager'
import Loading from './Loading'
import NoData from './NoData'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'
import Title from './Title'

// TODO: If the ministry_key is BCPS, lock employee type to REG; otherwise don't
// lock variables
const Region = (): JSX.Element => {
  const title = 'Representation — Region'
  const { progressData: data } = useDataManager()

  return (
    <div>
      <Title title={title} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          <RegionGraph data={data} title={title} />
          <RegionTable data={data} />
        </div>
      )}
    </div>
  )
}

export default Region
