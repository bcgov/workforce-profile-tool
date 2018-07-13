import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from '../Table/Definitions'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import { formatPercent, formatNumber } from '../Services/formatter'

import './Table.css'

class ProgressTable extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    // const totalRow = this.props.data.filter(d => d['Des_Grp'] === 'AS_TOTAL')
    const totalRow = null
    const data = this.props.data
      .filter(d => !['AS_TOTAL', 'WOM_SM'].includes(d['Des_Grp']))

    const total = this.props.data.find(d => d['Des_Grp'] === 'AS_TOTAL')
    const totalHired = total ? +total['2018_hired_ct'] : 1

    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: '2018_hired_ct',
        name: 'Hired in 2018',
        accessor: d => formatNumber(d['2018_hired_ct']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'percent_total',
        name: 'Percent all 2018 hires, %',
        accessor: d => formatPercent(d['2018_hired_ct'], 1, totalHired),
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
              <Definitions />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ProgressTable
