import { Route, Switch, withRouter } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React from 'react'

import { DataManagerProvider } from '../Data/DataManager'
import {
  ComparisonRawData,
  EmployeeCountRawData,
  LeadershipRawData,
  MinistryRawData,
  OccupationRegionRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

import './App.scss'

const BASE_URL = process.env.REACT_APP_BASE_URL
const PROGRESS_FILE = 'WP2020_Ind_Progress.csv'
const LEADERSHIP_FILE = 'WP2020_Leadership.csv'
const MINISTRY_FILE = 'WP2020_Ministries.csv'
const COMPARISON_FILE = 'WP2020_Comparison.csv'
const EMP_COUNT_FILE = 'WP2020_EmpCounts.csv'
const OCC_REG_FILE = 'WP2020_Rep_Occ_Rgn.csv'

const loadData = <T,>(fileName: string) => {
  return useQuery(fileName, async () =>
    (await d3.csv(`${BASE_URL}/${fileName}`)).map((d) => (d as unknown) as T)
  )
}

const App = (): JSX.Element => {
  const { data: progressData } = loadData<ProgressRawData>(PROGRESS_FILE)
  const { data: leadershipData } = loadData<LeadershipRawData>(LEADERSHIP_FILE)
  const { data: ministryData } = loadData<MinistryRawData>(MINISTRY_FILE)
  const { data: comparisonData } = loadData<ComparisonRawData>(COMPARISON_FILE)
  const { data: employeeCountData } = loadData<EmployeeCountRawData>(
    EMP_COUNT_FILE
  )
  const { data: occupationRegionData } = loadData<OccupationRegionRawData>(
    OCC_REG_FILE
  )

  return (
    <div className="App container-fluid">
      <DataManagerProvider
        progressData={progressData}
        leadershipData={leadershipData}
        ministryData={ministryData}
        comparisonData={comparisonData}
        employeeCountData={employeeCountData}
        occupationRegionData={occupationRegionData}
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
