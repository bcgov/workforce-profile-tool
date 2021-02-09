import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeVariables'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'

const Comparison = (): JSX.Element => {
  const title = 'Comparison with Provincial Workforce'
  const employeeCount = 1000 // useQueryParams
  const ministry = '' // useQueryParams
  const { indicatorsOfProgressData: data } = useDataManager()

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
          <ComparisonGraph data={data} title={title} ministry={ministry} />
          <ComparisonTable data={data} ministry={ministry} />
        </div>
      )}
    </div>
  )
}

export default withRouter(Comparison)
