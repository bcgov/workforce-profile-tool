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
      { display: 'Regular', key: 'Employees_Reg', active: true },
      { display: 'Auxiliary', key: 'Employees_Aux', active: true }
    ]
  },
  {
    key: 'DesignatedMinority_Group',
    display: 'Designated Group',
    options: [
      { display: 'Aboriginal Peoples', key: 'ABO', active: true },
      { display: 'People with Disabilities', key: 'DIS', active: true },
      { display: 'Visible Minorities', key: 'VM', active: true },
      { display: 'Women', key: 'WOM', active: true }
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
    const variables = VARIABLE_MAPPING.map(v => <Variable key={v.key} variable={v} />)

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
