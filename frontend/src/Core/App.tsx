/*import { Route, Routes } from 'react-router-dom'
import { useCallback, useState } from 'react'

import { DataManagerProvider } from '../Data/DataManager'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

import './App.scss'

const App = (): JSX.Element => {
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
            <Routes>
              <Route path={`/`} element={<Main />} />
              <Route path={`/:highLevelNav`} element={<Main />} />
              <Route
                path={`/:highLevelNav/:lowLevelNav`}
                element={<Main />}
              />
            </Routes>
          </div>
        </div>
      </DataManagerProvider>
    </div>
  )
}

export default App*/
