import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from '../Table/Definitions'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import { parseFloatClean } from '../Services/formatter'

import './Table.css'

class ComparisonTable extends Component {
  render () {
    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: 'Employees_BCPS',
        name: 'BC Public Service, %',
        accessor: d => parseFloatClean(d['Employees_BCPS']),
        displayAccessor: d => d['Employees_BCPS'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Available_Workforce_BCPS',
        name: 'Available Workforce, %',
        accessor: d => parseFloatClean(d['Available_Workforce_BCPS']),
        displayAccessor: d => d['Available_Workforce_BCPS'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Employees_BC_Population',
        name: 'BC Population, %',
        accessor: d => parseFloatClean(d['Employees_BC_Population']),
        displayAccessor: d => d['Employees_BC_Population'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          { this.props.data && this.props.data.length &&
            <div>
              <Reactor.Table
                columns={columns}
                rows={this.props.data}
                rowFilter={rowFilter}
              />
              <Definitions />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ComparisonTable
