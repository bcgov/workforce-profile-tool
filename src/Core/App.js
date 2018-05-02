import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import DataLoader from '../Data/DataLoader'
import qs from '../Services/query-string'

const ALL_VALUE = 'ALL'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      originalData: {},
      occupationRegionData: null,
      flowData: null
    }

    // this.filterFromProps(props)
  }

  processFilter (key, value, data) {
    // If key or value are falsy, don't filter
    if (!(key && value)) {
      console.warn(`processFilter: key '${key}' and/or value '${value}' are falsy`)
      return data
    }

    // If the value is ALL, don't filter
    if (value === ALL_VALUE) return data

    // If the value is an ARRAY, any of the included items is permissible
    if (value instanceof Array) {
      return data.filter(d => value.includes(d[key]))
    }

    // Not an array. Match only the selected item
    return data.filter(d => d[key] === value)
  }

  processFilters (filterObject, originalData) {
    let filteredData = originalData
    Object.keys(filterObject).forEach(key => {
      const value = filterObject[key]
      filteredData = this.processFilter(key, value, filteredData)
    })
    return filteredData
  }

  filterFromProps (props) {
    const filters = qs.parse(props.location.search)
    console.log('filters', filters)
    if (Object.keys(filters).length > 0 && this.state.originalData.occupationRegionData) {
      const occupationRegionData = this.processFilters(filters, this.state.originalData.occupationRegionData)
      this.setState({ occupationRegionData })
    }
  }

  async componentDidMount () {
    const iopReportData = await DataLoader.getIndicatorsOfProgressReport()
    const comparisonData = await DataLoader.getComparisonReport()
    const ministryData = await DataLoader.getMinistryReport()
    const occupationRegionData = await DataLoader.getOccupationRegionReport()
    const flowReportData = await DataLoader.getFlowReport()

    // Build keys
    iopReportData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    comparisonData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    ministryData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    occupationRegionData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    flowReportData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    console.log('ministryData', ministryData)

    this.setState({
      iopReportData,
      comparisonData,
      ministryData,
      occupationRegionData,
      flowReportData,
      originalData: {
        iopReportData,
        comparisonData,
        ministryData,
        occupationRegionData,
        flowReportData
      }
    }, () => { this.filterFromProps(this.props) })
  }

  componentWillReceiveProps (nextProps) {
    this.filterFromProps(nextProps)
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
