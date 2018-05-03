import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { displayNameByKey } from '../Variables/VariableList'

import { formatPercent, parseFloatClean } from '../Services/formatter'

import './Table.css'

class ComparisonTable extends Component {
  render () {
    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: 'Employees_Reg_BCPS',
        name: 'BC Public Service',
        accessor: d => parseFloatClean(d['Employees_Reg_BCPS']),
        displayAccessor: d => formatPercent(d['Employees_Reg_BCPS']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Employees_Reg_Available_Workforce',
        name: 'Available Workforce',
        accessor: d => parseFloatClean(d['Employees_Reg_Available_Workforce']),
        displayAccessor: d => formatPercent(d['Employees_Reg_Available_Workforce']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Employees_BC_Population',
        name: 'BC Population',
        accessor: d => parseFloatClean(d['Employees_BC_Population']),
        displayAccessor: d => formatPercent(d['Employees_BC_Population']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          { this.props.data &&
            <div>
              <Reactor.Table
                columns={columns}
                rows={this.props.data}
                rowFilter={rowFilter}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ComparisonTable
