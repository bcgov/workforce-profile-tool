import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'

// TODO: Set variables: ALL employees, BCPS ministry
const Leadership = (): JSX.Element => {
  const title = 'Leadership by Type'
  const { progressData: data } = useDataManager()

  console.log('data', data)

  return (
    <div>
      <Title title={title} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          <LeadershipGraph title={title} />
          {/* <LeadershipTable /> */}
        </div>
      )}
    </div>
  )
}

export default Leadership
