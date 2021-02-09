import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'
import OccupationGraph from '../Graphs/OccupationGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'

// TODO: If the ministry_key is BCPS, lock employee type to REG; otherwise don't
// lock variables
const Occupation = (): JSX.Element => {
  const title = 'Representation — Occupation'
  const employeeCount = 1000 // useQueryParams
  const { indicatorsOfProgressData: data } = useDataManager()

  return (
    <div>
      <Title title={title} employeeCount={employeeCount} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          <OccupationGraph data={data} title={title} />
          <OccupationTable data={data} />
        </div>
      )}
    </div>
  )
}

export default withRouter(Occupation)
