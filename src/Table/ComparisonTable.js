import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from '../Table/Definitions'
import DownloadDataLink from './DownloadDataLink'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import { formatPercent, parseFloatClean } from '../Services/formatter'

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
        name: `${this.props.ministry}, %`,
        accessor: d => parseFloatClean(d['Employees_BCPS']),
        displayAccessor: d => formatPercent(d['Employees_BCPS'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Available_Workforce_BCPS',
        name: 'Available Workforce, %',
        accessor: d => parseFloatClean(d['Available_Workforce_BCPS']),
        displayAccessor: d => formatPercent(d['Available_Workforce_BCPS'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Employees_BC_Population',
        name: 'BC Population, %',
        accessor: d => parseFloatClean(d['Employees_BC_Population']),
        displayAccessor: d => formatPercent(d['Employees_BC_Population'], 1, 100),
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
              <DownloadDataLink
                columns={columns}
                rows={this.props.data}
                filename={'comparison'}
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
