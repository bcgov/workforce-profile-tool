import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import DataLoader from '../Data/DataLoader'
import qs from '../Services/query-string'
import {
  VARIABLE_MANAGER,
  toggleVariable,
  toActiveVariableArray,
  fromActiveVariableArray
} from '../Variables/VariableManager'

const ALL_VALUE = 'ALL'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      originalData: {},
      occupationRegionData: null,
      flowData: null,
      activeVariables: {}
    }

    this.updateLocation = this.updateLocation.bind(this)
    this.updateVariable = this.updateVariable.bind(this)
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
    if (!filters['Employee_Type']) {
      filters['Employee_Type'] = 'Employees_All'
    }
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

  updateVariable (variableGroup, variable) {
    const groupKey = variableGroup.key
    const varKey = variable.key

    const activeVariables = toggleVariable(this.state.activeVariables, groupKey, varKey)

    this.setState({ activeVariables }, () => { this.updateLocation() })
  }

  updateLocation () {
    this.props.history.push({
      search: '?' + qs.stringify(toActiveVariableArray(this.state.activeVariables))
    })
  }

  async componentDidMount () {
    const activeVariables = VARIABLE_MANAGER.emptySelectableVariableMap()
    fromActiveVariableArray(activeVariables, qs.parse(this.props.location.search))

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
      activeVariables,
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
              updateVariable={this.updateVariable}
              variableManager={VARIABLE_MANAGER}
              activeVariables={this.state.activeVariables}
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
