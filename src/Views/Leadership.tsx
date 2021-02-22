import React from 'react'

import { useDataManager } from '../Data/DataManager'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import LeadershipTable from '../Table/LeadershipTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

// TODO: Set variables: ALL employees, BCPS ministry
const Leadership = (): JSX.Element => {
  const title = 'Leadership by Type'
  const { leadershipData: data } = useDataManager()

  console.log('data', data)

  return (
    <div>
      <Title title={title} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          <LeadershipGraph title={title} />
          <LeadershipTable />
        </div>
      )}
    </div>
  )
}

export default Leadership
