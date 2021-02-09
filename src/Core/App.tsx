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
import { IndicatorsOfProgress2018RawDataType } from '../@types/DataTypes'

const BASE_URL = ''
const QUERY_INDICATORS_OF_PROGRESS =
  'ERAP/workforce-profiles/data/2018/WP2018_Ind_Progress-2_Sep2018.csv'

interface Props extends RouteComponentProps {
  history: FixTypeLater
}

const App = (props: Props): JSX.Element => {
  const {
    data: indicatorsOfProgressData,
    isLoading: indicatorsOfProgressIsLoading,
    isError: indicatorsOfProgressIsError,
  } = useQuery('indicatorsOfProgress', async () => {
    const url = `${BASE_URL}/${QUERY_INDICATORS_OF_PROGRESS}`
    return await (await d3.csv(url)).map(
      (d) => (d as unknown) as IndicatorsOfProgress2018RawDataType
    )
  })

  console.log(
    indicatorsOfProgressData,
    indicatorsOfProgressIsLoading,
    indicatorsOfProgressIsError
  )

  return (
    <div className="App container-fluid">
      <DataManagerProvider indicatorsOfProgressData={indicatorsOfProgressData}>
        <div className="row">
          <div className="LeftColumn col-2">
            <Header />
            <VariableList />
          </div>
          <div className="col-10 MainWrapper">
            <Switch>
              <Route exact path={`/`} render={(props) => <Main {...props} />} />
            </Switch>
          </div>
        </div>
      </DataManagerProvider>
    </div>
  )
}

export default withRouter(App)
