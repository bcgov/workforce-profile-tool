import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import DataLoader from '../Data/DataLoader'
import qs from 'query-string'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      originalData: {},
      occupationRegionData: null,
      flowData: null
    }
  }

  filterDataByEmployeeType (employeeType) {
    if (employeeType !== 'All') {
      const occupationRegionData = this.state.originalData.occupationRegionData.filter(d => {
        return d['Employee_Type'] === employeeType
      })

      this.setState({ occupationRegionData })
    }
  }

  async componentDidMount () {
    const occupationRegionData = await DataLoader.getOccupationRegionReport()
    this.setState({ occupationRegionData, originalData: { occupationRegionData } })
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('location', this.props.location)
    const filters = qs.parse(this.props.location.search)
    if (prevProps != this.props && filters['employee-type']) {
      console.log('here we are')
      this.filterDataByEmployeeType(filters['employee-type'])
    }
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
              <Route exact path={`/`} render={props => <Main data={this.state} {...props} />} />
              <Route exact path={`/:highLevelNav`} render={props => <Main data={this.state} {...props} />} />
              <Route exact path={`/:highLevelNav/:lowLevelNav`} render={props => <Main data={this.state} {...props} />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
