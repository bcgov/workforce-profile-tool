import React, { Component } from 'react'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import './App.scss'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import DataLoader from '../Data/DataLoader'
import qs from '../Services/query-string'
import {
  VARIABLE_MANAGER,
  fromActiveVariableArray,
  toActiveVariableArray,
  toggleVariable,
} from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'
import { DataManagerProvider } from '../Data/DataManager'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import * as d3 from 'd3'
import {
  IndicatorsOfProgress2018RawDataType,
  Leadership2018RawDataType,
} from '../@types/DataTypes'

const BASE_URL = ''
const QUERY_INDICATORS_OF_PROGRESS =
  'ERAP/workforce-profiles/data/2018/WP2018_Ind_Progress-2_Sep2018.csv'
const QUERY_LEADERSHIP =
  'ERAP/workforce-profiles/data/2018/WP2018_Leadership.csv'

const App = (): JSX.Element => {
  const { data: indicatorsOfProgressData } = useQuery(
    'indicatorsOfProgress',
    async () => {
      const url = `${BASE_URL}/${QUERY_INDICATORS_OF_PROGRESS}`
      return await (await d3.csv(url)).map(
        (d) => (d as unknown) as IndicatorsOfProgress2018RawDataType
      )
    }
  )

  const { data: leadershipData } = useQuery('leadership', async () => {
    const url = `${BASE_URL}/${QUERY_LEADERSHIP}`
    return await (await d3.csv(url)).map(
      (d) => (d as unknown) as Leadership2018RawDataType
    )
  })

  return (
    <div className="App container-fluid">
      <DataManagerProvider
        indicatorsOfProgressData={indicatorsOfProgressData}
        leadershipData={leadershipData}
      >
        <div className="row">
          <div className="LeftColumn col-2">
            <Header />
            <VariableList />
          </div>
          <div className="col-10 MainWrapper">
            <Switch>
              <Route exact path={`/`} render={(props) => <Main {...props} />} />
              <Route
                exact
                path={`/:highLevelNav`}
                render={(props) => <Main {...props} />}
              />
              <Route
                exact
                path={`/:highLevelNav/:lowLevelNav`}
                render={(props) => <Main {...props} />}
              />
            </Switch>
          </div>
        </div>
      </DataManagerProvider>
    </div>
  )
}

export default withRouter(App)
