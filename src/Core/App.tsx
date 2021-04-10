import { Route, Switch, withRouter } from 'react-router-dom'
import { StringParam, useQueryParam } from 'use-query-params'
import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React, { useCallback, useEffect } from 'react'

import { DataManagerProvider } from '../Data/DataManager'
import {
  ComparisonRawData,
  EmployeeCountRawData,
  LeadershipRawData,
  OccupationRegionRawData,
  ProgressRawData,
} from '../@types/DataTypes'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

import './App.scss'
import FixTypeLater from '../@types/FixTypeLater'

// const BASE_URL = process.env.REACT_APP_BASE_URL
// const PROGRESS_FILE = 'WPXXXX_Ind_Progress.csv'
// const LEADERSHIP_FILE = 'WPXXXX_Leadership.csv'
// const COMPARISON_FILE = 'WPXXXX_Comparison.csv'
// const EMP_COUNT_FILE = 'WPXXXX_EmpCounts.csv'
// const OCC_REG_FILE = 'WPXXXX_Rep_Occ_Rgn.csv'

// const refetchOptions = {
//   enabled: false,
//   refetchOnWindowFocus: false,
//   refetchInterval: 0,
// }

const App = (): JSX.Element => {
  // Fetch the metadata.

  // const [yearQueryVar] = useQueryParam('Year', StringParam)

  // // TODO: Still a bit of a kludge
  // const cb = useCallback(
  //   async (fileName) => {
  //     if (yearQueryVar) {
  //       return await d3.csv(
  //         `${BASE_URL}${yearQueryVar}/${fileName.replace('XXXX', yearQueryVar)}`
  //       )
  //     } else {
  //       return []
  //     }
  //   },
  //   [yearQueryVar]
  // )

  // const { data: progressData, refetch: progressRefetch } = useQuery(
  //   PROGRESS_FILE,
  //   cb.bind(undefined, PROGRESS_FILE),
  //   refetchOptions
  // )
  // const { data: leadershipData, refetch: leadershipRefetch } = useQuery(
  //   LEADERSHIP_FILE,
  //   cb.bind(undefined, LEADERSHIP_FILE),
  //   refetchOptions
  // )
  // const { data: comparisonData, refetch: comparisonRefetch } = useQuery(
  //   COMPARISON_FILE,
  //   cb.bind(undefined, COMPARISON_FILE),
  //   refetchOptions
  // )
  // const { data: employeeCountData, refetch: employeeCountRefetch } = useQuery(
  //   EMP_COUNT_FILE,
  //   cb.bind(undefined, EMP_COUNT_FILE),
  //   refetchOptions
  // )
  // const {
  //   data: occupationRegionData,
  //   refetch: occupationRegionRefetch,
  // } = useQuery(OCC_REG_FILE, cb.bind(undefined, OCC_REG_FILE), refetchOptions)

  // useEffect(() => {
  //   if (yearQueryVar) {
  //     progressRefetch()
  //     leadershipRefetch()
  //     comparisonRefetch()
  //     employeeCountRefetch()
  //     occupationRegionRefetch()
  //   }
  // }, [yearQueryVar])

  return (
    <div className="App container-fluid">
      <DataManagerProvider
      // progressData={progressData as ProgressRawData[]}
      // leadershipData={leadershipData as LeadershipRawData[]}
      // comparisonData={comparisonData as ComparisonRawData[]}
      // employeeCountData={employeeCountData as EmployeeCountRawData[]}
      // occupationRegionData={occupationRegionData as OccupationRegionRawData[]}
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
