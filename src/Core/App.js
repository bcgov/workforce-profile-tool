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

    if (!data || !data.length) {
      console.warn(`processFilter: data is empty or non-existent`)
      return data
    }

    // If key doesn't exist, don't filter
    if (!data[0][key]) {
      console.warn(`processFilter: key '${key}' does not exist in 0th data item`)
      return data
    }

    // If the value is ALL, don't filter
    if (value === ALL_VALUE) return data

    // If the value is an ARRAY, any of the included items is permissible
    // Note that keys starting with 'AS_' (Always Show) will never be filtered
    // out.
    if (value instanceof Array) {
      return data.filter(d => {
        return d[key].startsWith('AS_') ||
          value.some(v => d[key].startsWith(v))
      })
    }

    // Not an array. Match only the selected item
    return data.filter(d => {
      return d[key].startsWith('AS_') ||
        d[key].startsWith(value)
    })
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
    if (Object.keys(filters).length > 0 && this.state.originalData.iopReportData) {
      const iopReportData = this.processFilters(filters, this.state.originalData.iopReportData)
      this.setState({ iopReportData })
    }
    if (Object.keys(filters).length > 0 && this.state.originalData.comparisonData) {
      const comparisonData = this.processFilters(filters, this.state.originalData.comparisonData)
      this.setState({ comparisonData })
    }
    if (Object.keys(filters).length > 0 && this.state.originalData.ministryData) {
      const ministryData = this.processFilters(filters, this.state.originalData.ministryData)
      this.setState({ ministryData })
    }
  }

  async componentDidMount () {
    const iopReportData = await DataLoader.getIndicatorsOfProgressReport()
    const comparisonData = await DataLoader.getComparisonReport()
    const ministryData = await DataLoader.getMinistryReport()
    const occupationRegionData = await DataLoader.getOccupationRegionReport()
    const flowReportData = await DataLoader.getFlowReport()

    console.log('occupationRegionData', occupationRegionData)

    // Build keys
    iopReportData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    comparisonData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    ministryData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    occupationRegionData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    flowReportData.forEach(r => { r.key = ''.concat(Object.values(r)) })

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
          <div className='LeftColumn col-2'>
            <Header />
            <VariableList />
          </div>
          <div className='col-10'>
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
