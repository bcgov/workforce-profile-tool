import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './VariableList.css'
import Variable from './Variable'
import qs from 'query-string'

export const VARIABLE_MAPPING = [
  {
    key: 'Employee_Type',
    display: 'Employee Type',
    options: [
      { display: 'All', key: 'Employees_All', active: true },
      { display: 'Regular', key: 'Employees_Reg' },
      { display: 'Auxiliary', key: 'Employees_Aux' }
    ]
  },
  {
    key: 'DesignatedMinority_Group',
    display: 'Designated Group',
    options: [
      { display: 'Aboriginal Peoples', key: 'ABO', active: true },
      { display: 'People with Disabilities', key: 'DIS' },
      { display: 'Visible Minorities', key: 'VM' },
      { display: 'Women', key: 'WOM' }
    ]
  }
]

class VariableList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: {
        'Employee_Type': 'Employees_All',
        'DesignatedMinority_Group': 'ABO'
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
      <Variable key={v.key} variable={v} updateCallback={this.updateCallback} />
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
