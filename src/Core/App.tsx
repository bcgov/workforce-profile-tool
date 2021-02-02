import React, { Component } from 'react'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import './App.scss'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'
import DataLoader from '../Data/DataLoader'
import qs from '../Services/query-string'
import {
  VARIABLE_MANAGER,
  fromActiveVariableArray,
  toActiveVariableArray,
  toggleVariable,
} from '../Variables/VariableManager'
import FixTypeLater from '../@types/FixTypeLater'

interface Props extends RouteComponentProps {
  history: FixTypeLater
}

type State = FixTypeLater

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      originalData: {},
      occupationRegionData: null,
      flowData: null,
      activeVariables: VARIABLE_MANAGER.emptySelectableVariableMap(),
      variablesToLock: false,
      savedEmployeeType: null,
      savedMinistry: null,
    }

    this.updateLocation = this.updateLocation.bind(this)
    this.updateVariable = this.updateVariable.bind(this)
    this.setVariableLock = this.setVariableLock.bind(this)
  }

  processFilter(key: FixTypeLater, value: FixTypeLater, data: FixTypeLater) {
    // console.log('---->', key, value, data)

    // If key or value are falsy, don't filter
    if (!(key && value)) {
      console.warn(
        `processFilter: key '${key}' and/or value '${value}' are falsy`
      )
      return data
    }

    if (!data || !data.length) {
      console.warn(`processFilter: data is empty or non-existent`)
      return data
    }

    // If key doesn't exist, don't filter
    if (!data[0][key]) {
      console.warn(
        `processFilter: key '${key}' does not exist in 0th data item`
      )
      return data
    }

    // If the value is ALL, don't filter
    // if (value === ALL_VALUE) return data

    // If the value is an ARRAY, any of the included items is permissible
    // Note that keys starting with 'AS_' (Always Show) will never be filtered
    // out.
    if (value instanceof Array) {
      return data.filter((d: FixTypeLater) => {
        return d[key].startsWith('AS_') || value.some((v) => d[key] === v)
      })
    }

    // Not an array. Match only the selected item
    return data.filter((d: FixTypeLater) => {
      return d[key].startsWith('AS_') || d[key] === value
    })
  }

  processFilters(filterObject: FixTypeLater, originalData: FixTypeLater) {
    let filteredData = originalData.slice()
    Object.keys(filterObject).forEach((key) => {
      const value = filterObject[key]
      filteredData = this.processFilter(key, value, filteredData)
    })
    return filteredData
  }

  filterFromProps(props: Props) {
    const filters = qs.parse(props.location.search)

    if (!filters['Employee_Type']) {
      filters['Employee_Type'] = 'ALL'
      const activeVariables = toggleVariable(
        this.state.activeVariables,
        'Employee_Type',
        'ALL'
      )
      this.setState({ activeVariables }, () => this.updateLocation())
    }

    if (!filters['Ministry_Key']) {
      filters['Ministry_Key'] = 'BCPS'
      const activeVariables = toggleVariable(
        this.state.activeVariables,
        'Ministry_Key',
        'BCPS'
      )
      this.setState({ activeVariables }, () => this.updateLocation())
    }

    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.occupationRegionData
    ) {
      const occupationRegionData = this.processFilters(
        filters,
        this.state.originalData.occupationRegionData
      )
      // const filterCount = occupationRegionData
      // .find(d => d['Variable_Type'] === 'Total')['Total_Count_ORG']
      // TODO: we can't actually show the numerator because we would double-count
      // individuals who are e.g. both female and indigenous.
      this.setState({ occupationRegionData })
    }
    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.iopReportData
    ) {
      const iopReportData = this.processFilters(
        filters,
        this.state.originalData.iopReportData
      )
      this.setState({ iopReportData })
    }
    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.comparisonData
    ) {
      const comparisonData = this.processFilters(
        filters,
        this.state.originalData.comparisonData
      )
      this.setState({ comparisonData })
    }
    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.leadershipData
    ) {
      const leadershipData = this.processFilters(
        filters,
        this.state.originalData.leadershipData
      )
      this.setState({ leadershipData })
    }
    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.ministryData
    ) {
      const ministryData = this.processFilters(
        filters,
        this.state.originalData.ministryData
      )
      this.setState({ ministryData })
    }
    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.flowReportData
    ) {
      const flowReportData = this.processFilters(
        filters,
        this.state.originalData.flowReportData
      )
      this.setState({ flowReportData })
    }
    if (
      Object.keys(filters).length > 0 &&
      this.state.originalData.flowReportData
    ) {
      const employeeCountData = this.processFilters(
        filters,
        this.state.originalData.employeeCountData
      )
      this.setState({ employeeCountData })
    }
  }

  setVariableLock(variablesToLock: FixTypeLater) {
    if (variablesToLock) {
      let currentEmployeeType = this.state.activeVariables['Employee_Type']
      let currentMinistry = this.state.activeVariables['Ministry_Key']
      if (variablesToLock['Employee_Type']) {
        currentEmployeeType =
          this.state.savedEmployeeType ||
          Object.assign({}, this.state.activeVariables.Employee_Type)
      }
      if (variablesToLock['Ministry_Key']) {
        currentMinistry =
          this.state.savedMinistry ||
          Object.assign({}, this.state.activeVariables.Ministry_Key)
      }

      let activeVariables

      Object.keys(variablesToLock).forEach((variableGroupKey) => {
        activeVariables = toggleVariable(
          this.state.activeVariables,
          variableGroupKey,
          variablesToLock[variableGroupKey]
        )
      })

      this.setState(
        {
          variablesToLock,
          activeVariables,
          savedEmployeeType: currentEmployeeType,
          savedMinistry: currentMinistry,
        },
        () => this.updateLocation()
      )
    } else {
      if (this.state.savedEmployeeType || this.state.savedMinistry) {
        const activeVariables = this.state.activeVariables
        activeVariables.Employee_Type = this.state.savedEmployeeType
        activeVariables.Ministry_Key = this.state.savedMinistry

        this.setState(
          {
            variablesToLock,
            activeVariables,
            savedEmployeeType: null,
            savedMinistry: null,
          },
          () => this.updateLocation()
        )
      } else {
        this.setState({ variablesToLock })
      }
    }
  }

  updateVariable(variableGroup: FixTypeLater, variable: FixTypeLater) {
    const groupKey = variableGroup.key
    const varKey = variable.key

    const activeVariables = toggleVariable(
      this.state.activeVariables,
      groupKey,
      varKey
    )
    this.setState({ activeVariables }, () => {
      this.updateLocation()
    })
  }

  updateLocation() {
    // console.log('this.state.activeVariables', this.state.activeVariables)
    this.props.history.push({
      search:
        '?' + qs.stringify(toActiveVariableArray(this.state.activeVariables)),
    })
  }

  async componentDidMount(): Promise<void> {
    // const activeVariables =
    const activeVariables = this.state.activeVariables
    fromActiveVariableArray(
      activeVariables,
      qs.parse(this.props.location.search)
    )

    const iopReportData = await DataLoader.getIndicatorsOfProgressReport()
    const comparisonData = await DataLoader.getComparisonReport()
    const leadershipData = await DataLoader.getLeadershipReport()
    const ministryData = await DataLoader.getMinistryReport()
    const occupationRegionData = await DataLoader.getOccupationRegionReport()
    const flowReportData = await DataLoader.getFlowReport()
    const employeeCountData = await DataLoader.getEmployeeCount()

    // Build keys
    iopReportData.forEach((r) => {
      r.key = ''.concat(Object.values(r) as FixTypeLater)
    })
    comparisonData.forEach((r) => {
      r.key = ''.concat(Object.values(r) as FixTypeLater)
    })
    leadershipData.forEach((r) => {
      r.key = ''.concat(Object.values(r) as FixTypeLater)
    })
    ministryData.forEach((r) => {
      r.key = ''.concat(Object.values(r) as FixTypeLater)
    })
    occupationRegionData.forEach((r) => {
      r.key = ''.concat(Object.values(r) as FixTypeLater)
    })
    employeeCountData.forEach((r) => {
      r.key = ''.concat(Object.values(r) as FixTypeLater)
    })

    this.setState(
      {
        activeVariables,
        iopReportData,
        comparisonData,
        leadershipData,
        ministryData,
        occupationRegionData,
        flowReportData,
        employeeCountData,
        originalData: {
          iopReportData,
          comparisonData,
          leadershipData,
          ministryData,
          occupationRegionData,
          flowReportData,
          employeeCountData,
        },
      },
      () => {
        this.filterFromProps(this.props)
      }
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    this.filterFromProps(nextProps)
  }

  render(): JSX.Element {
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="LeftColumn col-2">
            <Header />
            <VariableList
              updateVariable={this.updateVariable}
              variableManager={VARIABLE_MANAGER}
              activeVariables={this.state.activeVariables}
              variablesToLock={this.state.variablesToLock}
            />
          </div>
          <div className="col-10 MainWrapper">
            <Switch>
              <Route
                exact
                path={`/`}
                render={(props) => (
                  <Main
                    data={this.state}
                    variableLockCallback={this.setVariableLock}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path={`/:highLevelNav`}
                render={(props) => (
                  <Main
                    data={this.state}
                    variableLockCallback={this.setVariableLock}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path={`/:highLevelNav/:lowLevelNav`}
                render={(props) => (
                  <Main
                    data={this.state}
                    variableLockCallback={this.setVariableLock}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
