import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import DataLoader from '../Data/DataLoader'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      occupationRegionData: {},
      flowData: {}
    }
  }

  async componentDidMount () {
    const occupationRegionData = await DataLoader.getOccupationRegionReport()
    this.setState({ occupationRegionData })
  }

  render () {
    return (
      <div className='App container-fluid'>
        <div className='row'>
          <div className='LeftColumn col-3'>
            <Header />
            <VariableList />
          </div>
          <div className='col-9'>
            <Switch>
              <Route exact path={`/`} component={Main} />
              <Route exact path={`/:highLevelNav`} component={Main} />
              <Route exact path={`/:highLevelNav/:lowLevelNav`} component={Main} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default App
