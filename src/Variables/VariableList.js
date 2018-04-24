import React, { Component } from 'react'
import '../bootstrap/bootstrap.css'
import './VariableList.css'

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

export default VariableList
