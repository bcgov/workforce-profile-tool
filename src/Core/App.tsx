import { Route, Switch, withRouter } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React from 'react'

import { DataManagerProvider } from '../Data/DataManager'
import {
  LeadershipRawData,
  MinistryRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

import './App.scss'
import { VARIABLES } from '../Variables/VariableManager'

const BASE_URL = 'workforce-profiles/data/2018'
const PROGRESS_FILE = 'WP2018_Ind_Progress-2_Sep2018.csv'
const LEADERSHIP_FILE = 'WP2018_Leadership.csv'
const MINISTRY_FILE = 'WP2018_Ministries.csv'

const loadData = <T,>(fileName: string) => {
  return useQuery(fileName, async () =>
    (await d3.csv(`${BASE_URL}/${fileName}`)).map((d) => (d as unknown) as T)
  )
}

const App = (): JSX.Element => {
  const { data: progressData } = loadData<ProgressRawData>(PROGRESS_FILE)
  const { data: leadershipData } = loadData<LeadershipRawData>(LEADERSHIP_FILE)
  const { data: ministryData } = loadData<MinistryRawData>(MINISTRY_FILE)

  return (
    <div className="App container-fluid">
      <DataManagerProvider
        progressData={progressData}
        leadershipData={leadershipData}
        ministryData={ministryData}
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
