import React from 'react'

import { useDataManager } from '../Data/DataManager'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

const Hiring = (): JSX.Element => {
  const title = 'Indicators of Progress — Hiring, 2015 to 2018'
  const { progressData: data } = useDataManager()

  return (
    <div>
      <Title title={title} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          {/* <HiringGraph title={title} /> */}
          <HiringTable />
        </div>
      )}
    </div>
  )
}

export default Hiring
