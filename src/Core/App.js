import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import DataLoader from '../Data/DataLoader'
import qs from '../Services/query-string'

const ALL_VALUE = 'ALL'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      originalData: {},
      occupationRegionData: null,
      flowData: null,
      active: {},
      variables: VARIABLE_MANAGER
    }

    this.updateLocation = this.updateLocation.bind(this)
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
    if (Object.keys(filters).length > 0 && this.state.originalData.occupationRegionData) {
      const occupationRegionData = this.processFilters(filters, this.state.originalData.occupationRegionData)
      // const filterCount = occupationRegionData
        // .find(d => d['Variable_Type'] === 'Total')['Total_Count_ORG']
      // TODO: we can't actually show the numerator because we would double-count
      // individuals who are e.g. both female and indigenous.
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
    if (Object.keys(filters).length > 0 && this.state.originalData.leadershipData) {
      const leadershipData = this.processFilters(filters, this.state.originalData.leadershipData)
      this.setState({ leadershipData })
    }
    if (Object.keys(filters).length > 0 && this.state.originalData.ministryData) {
      const ministryData = this.processFilters(filters, this.state.originalData.ministryData)
      this.setState({ ministryData })
    }
    if (Object.keys(filters).length > 0 && this.state.originalData.flowReportData) {
      const flowReportData = this.processFilters(filters, this.state.originalData.flowReportData)
      this.setState({ flowReportData })
    }
  }

  updateCallback (variable) {
    const allActive = variable.options.every(o => o.active)
    const noneActive = variable.options.every(o => !o.active)

    if (noneActive) {
      // No options are active. For now, just set NONE as the variable filter.
      // This will work unless there are some values that actually have the
      // value 'NONE'. TODO: Tidy this up a bit
      const active = this.state.active
      active[variable.key] = 'NONE'
      this.setState({ active }, () => this.updateLocation())
    } else if (allActive) {
      // All are active. We don't need to pass the variable key at all; this is
      // the default for the data.
      const active = this.state.active
      delete active[variable.key]
      this.setState({ active }, () => this.updateLocation())
    } else {
      // Some are active, some are not.
      const activeKeys = variable.options.filter(o => o.active).map(o => o.key)
      const active = this.state.active
      active[variable.key] = activeKeys
      this.setState({ active }, () => this.updateLocation())
    }
  }

  updateLocation () {
    console.log('here we are', qs.stringify(this.state.active))
    this.props.history.push({
      search: '?' + qs.stringify(this.state.active)
    })
  }

  async componentDidMount () {
    const active = qs.parse(this.props.location.search)
    console.log('------>', active)
    if (!active['Employee_Type']) {
      active['Employee_Type'] = 'Employees_All'
    }
    if (!active['Des_Grp']) {
      active['Des_Grp'] = 'IND'
    }

    const iopReportData = await DataLoader.getIndicatorsOfProgressReport()
    const comparisonData = await DataLoader.getComparisonReport()
    const leadershipData = await DataLoader.getLeadershipReport()
    const ministryData = await DataLoader.getMinistryReport()
    const occupationRegionData = await DataLoader.getOccupationRegionReport()
    const flowReportData = await DataLoader.getFlowReport()

    // Build keys
    iopReportData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    comparisonData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    leadershipData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    ministryData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    occupationRegionData.forEach(r => { r.key = ''.concat(Object.values(r)) })
    flowReportData.forEach(r => { r.key = ''.concat(Object.values(r)) })

    this.setState({
      active,
      iopReportData,
      comparisonData,
      leadershipData,
      ministryData,
      occupationRegionData,
      flowReportData,
      originalData: {
        iopReportData,
        comparisonData,
        leadershipData,
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
            <VariableList
              updateVariable={this.updateLocation}
              variableMapping={this.state.variables}
            />
          </div>
          <div className='col-10 MainWrapper'>
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
