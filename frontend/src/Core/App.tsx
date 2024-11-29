import { Route, Switch } from 'react-router-dom'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { DataManagerProvider } from '../Data/DataManager'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import { loadSnowplow } from '../Helpers/loadSnowplow'

import './App.scss'

const App = (): JSX.Element => {
  const location = useLocation()
  const snowplowInitialized = useRef(false);

  useEffect(() => {
    if (!snowplowInitialized.current) {
      loadSnowplow();
      snowplowInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    //console.log('App.tsx: location changed to', location)
    if (window.snowplow) {
      window.snowplow('trackPageView');
    }
  }, [location]);

  const [showList, setShowList] = useState<boolean>(false)

  const toggleListCallback = useCallback(() => {
    setShowList(!showList)
  }, [showList])

  return (
    <div className="App container-fluid">
      <DataManagerProvider>
        <div className="row">
          <div className="LeftColumn col-12 col-sm-4 col-md-3 col-xl-2">
            <Header
              toggleListCallback={toggleListCallback}
              showList={showList}
            />
            <VariableList showList={showList} />
          </div>
          <div className="col-12 col-sm-8 col-md-9 col-xl-10 MainWrapper">
            <Switch>
              <Route exact path={`/`} render={() => <Main />} />
              <Route exact path={`/:highLevelNav`} render={() => <Main />} />
              <Route
                exact
                path={`/:highLevelNav/:lowLevelNav`}
                render={() => <Main />}
              />
            </Switch>
          </div>
        </div>
      </DataManagerProvider>
    </div>
  )
}

export default App
