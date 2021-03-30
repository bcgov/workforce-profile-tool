import { Route, Switch, withRouter } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useEffect, useState } from 'react'

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
import { StringParam, useQueryParam } from 'use-query-params'
import FixTypeLater from '../@types/FixTypeLater'

const BASE_URL = process.env.REACT_APP_BASE_URL
const PROGRESS_FILE = 'WPXXXX_Ind_Progress.csv'
const LEADERSHIP_FILE = 'WPXXXX_Leadership.csv'
const COMPARISON_FILE = 'WPXXXX_Comparison.csv'
const EMP_COUNT_FILE = 'WPXXXX_EmpCounts.csv'
const OCC_REG_FILE = 'WPXXXX_Rep_Occ_Rgn.csv'

const loadData = <T,>(fileName: string, year: string | null | undefined) => {
  return useQuery(fileName, async () => {
    if (year) {
      return (
        await d3.csv(`${BASE_URL}${year}/${fileName.replace('XXXX', year)}`)
      ).map((d) => (d as unknown) as T)
    } else {
      return []
    }
  })
}

const App = (): JSX.Element => {
  const [yearQueryVar, setYearQueryVar] = useQueryParam('Year', StringParam)

  const { data: progressData } = loadData<ProgressRawData>(
    PROGRESS_FILE,
    yearQueryVar
  )
  const { data: leadershipData } = loadData<LeadershipRawData>(
    LEADERSHIP_FILE,
    yearQueryVar
  )
  const { data: comparisonData } = loadData<ComparisonRawData>(
    COMPARISON_FILE,
    yearQueryVar
  )
  const { data: employeeCountData } = loadData<EmployeeCountRawData>(
    EMP_COUNT_FILE,
    yearQueryVar
  )
  const { data: occupationRegionData } = loadData<OccupationRegionRawData>(
    OCC_REG_FILE,
    yearQueryVar
  )

  return (
    <div className="App container-fluid">
      <DataManagerProvider
        progressData={progressData}
        leadershipData={leadershipData}
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
