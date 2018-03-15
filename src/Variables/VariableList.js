import React, { Component } from 'react'
import '../bootstrap/bootstrap.css'
import './VariableList.css'

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
            <li>All</li>
            <li>Women</li>
            <li className='active'>Visible Minorities</li>
            <li>Indigenous Peoples</li>
            <li>People with Disabilities</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default VariableList
