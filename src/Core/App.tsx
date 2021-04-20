import { Route, Switch, withRouter } from 'react-router-dom'
import React from 'react'

import { DataManagerProvider } from '../Data/DataManager'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

import './App.scss'

const App = (): JSX.Element => {
  return (
    <div className="App container-fluid">
      <DataManagerProvider>
        <div className="row">
          <div className="LeftColumn col-12 col-sm-4 col-md-3 col-xl-2">
            <Header />
            <VariableList />
          </div>
          <div className="col-12 col-sm-8 col-md-9 col-xl-10 MainWrapper">
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
