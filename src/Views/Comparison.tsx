import { withRouter } from 'react-router-dom'
import React from 'react'

import { useDataManager } from '../Data/DataManager'
import ComparisonTable from '../Table/ComparisonTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

const Comparison = (): JSX.Element => {
  const employeeCount = 1000 // useQueryParams
  const { progressData: data } = useDataManager()

  return (
    <div>
      <Title
        title={'Comparison with Provincial Workforce'}
        employeeCount={employeeCount}
      />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          {/* <ComparisonGraph data={data} title={title} ministry={ministry} /> */}
          <ComparisonTable />
        </div>
      )}
    </div>
  )
}

export default withRouter(Comparison)
