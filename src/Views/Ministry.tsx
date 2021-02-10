import React from 'react'

import { useDataManager } from '../Data/DataManager'
import Loading from './Loading'
import MinistryGraph from '../Graphs/MinistryGraph'
import NoData from './NoData'

// TODO: lock variables: REG and BCPS

const Ministry = (): JSX.Element => {
  const title = 'Ministries'
  const employeeCount = 1000 // useQueryParams
  const { progressData: data } = useDataManager()

  return (
    <div>
      <h1>{title}</h1>
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          <MinistryGraph
            data={data}
            title={title}
            employeeCount={employeeCount}
          />
        </div>
      )}
    </div>
  )
}

export default Ministry
