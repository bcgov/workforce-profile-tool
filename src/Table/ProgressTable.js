import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

import { parseFloatClean } from '../Services/formatter'

import './Table.css'

class ProgressTable extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    // const totalRow = this.props.data.filter(d => d['Des_Grp'] === 'AS_TOTAL')
    const totalRow = null
    const data = this.props.data.filter(d => d['Des_Grp'] !== 'AS_TOTAL')

    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: '2013_pc',
        name: '2013, %',
        accessor: d => parseFloatClean(d['2013_pc']),
        displayAccessor: d => d['2013_pc'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: '2015_pc',
        name: '2015, %',
        accessor: d => parseFloatClean(d['2015_pc']),
        displayAccessor: d => d['2015_pc'],
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
                rows={data}
                totalRows={totalRow}
                rowFilter={rowFilter}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ProgressTable
