import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../bootstrap/bootstrap.css'
import './VariableList.css'
import qs from 'query-string'

export const VARIABLE_MAPPING = [
  {
    key: 'Employee_Type',
    display: 'Employee Type',
    options: [
      { 'Employees_All': 'All' },
      { 'Employees_Reg': 'Regular' },
      { 'Employees_Aux': 'Auxiliary' }
    ]
  },
  {
    key: 'DesignatedMinority_Group',
    display: 'Designated Group',
    options: [
      { 'All': 'All' },
      { 'WOM': 'Women' },
      { 'VM': 'Visible Minorities' },
      { 'ABO': 'Aboriginal Peoples' },
      { 'DIS': 'People with Disabilities' }
    ]
  }
]

class VariableList extends Component {
  constructor (props) {
    super(props)
    this.updateLocation = this.updateLocation.bind(this)
  }

  updateLocation () {
    console.log(qs.stringify({
      'Employee_Type': ['Employees_Aux']
    }))
    this.props.history.push({
      search: '?' + qs.stringify({'Employee_Type': ['Employees_All', 'Employees_Aux']})
    }, null)
  }

  render () {
    return (
      <div className='VariableList row'>
        <div className='col'>
          <h3>Employees</h3>
          <ul>
            <li className='active'>All</li>
            <li>Regular</li>
            <li>Auxiliary</li>
          </ul>
          <h3>Target Groups</h3>
          <ul>
            <li className='active'>All</li>
            <li>Women</li>
            <li>Visible Minorities</li>
            <li>Indigenous Peoples</li>
            <li>People with Disabilities</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(VariableList)
