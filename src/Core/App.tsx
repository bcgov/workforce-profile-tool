import { Route, Switch, withRouter } from 'react-router-dom'
import React from 'react'

import { DataManagerProvider } from '../Data/DataManager'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

import './App.scss'

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
  return (
    <div className="App container-fluid">
      <DataManagerProvider>
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
