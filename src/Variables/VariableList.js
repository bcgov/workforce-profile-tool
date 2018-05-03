import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './VariableList.css'
import Variable from './Variable'
import qs from '../Services/query-string'

export const VARIABLE_MAPPING = [
  {
    key: 'Employee_Type',
    display: 'Employee Type',
    exclusive: true,
    options: [
      { display: 'All', key: 'Employees_All', active: true },
      { display: 'Regular', key: 'Employees_Reg' },
      { display: 'Auxiliary', key: 'Employees_Aux' }
    ]
  },
  {
    key: 'Des_Grp',
    display: 'Designated Group',
    options: [
      { display: 'Indigenous Peoples', key: 'IND', active: true },
      { display: 'People with Disabilities', key: 'DIS' },
      { display: 'Visible Minorities', key: 'VM' },
      { display: 'Women', key: 'WOM' }
    ]
  }
]

export const displayNameByKey = (variableKey, valueKey) => {
  return VARIABLE_MAPPING
    .filter(v => v.key === variableKey)[0]
    .options
    .filter(v => v.key === valueKey)[0].display
}

class VariableList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: {
        'Employee_Type': 'Employees_All',
        'Des_Grp': 'IND'
      }
    }
    this.updateCallback = this.updateCallback.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
  }

  componentDidMount () {
    this.updateLocation()
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
    this.props.history.push({
      search: '?' + qs.stringify(this.state.active)
    })
  }

  render () {
    const variables = VARIABLE_MAPPING.map(v =>
      <Variable key={v.key} exclusive={v.exclusive} variable={v} updateCallback={this.updateCallback} />
    )

    return (
      <div className='VariableList row'>
        <div className='col'>
          {variables}
        </div>
      </div>
    )
  }
}

export default withRouter(VariableList)
