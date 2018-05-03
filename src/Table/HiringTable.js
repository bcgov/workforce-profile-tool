import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { displayNameByKey } from '../Variables/VariableList'

import { formatPercent, parseIntClean, parseFloatClean } from '../Services/formatter'

import './Table.css'

class ProgressTable extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    // const totalRow = this.props.data.filter(d => d['Des_Grp'] === 'AS_TOTAL')
    const totalRow = null
    const data = this.props.data
      .filter(d => !['AS_TOTAL', 'WOM_SM'].includes(d['Des_Grp']))

    const total = this.props.data.find(d => d['Des_Grp'] === 'AS_TOTAL')
    const totalHired = total ? +total['2015_hired_ct'] : 1

    console.log('totalHired', totalHired)

    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: '2015_hired_ct',
        name: 'Hired in 2015',
        accessor: d => parseIntClean(d['2015_hired_ct']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'percent_total',
        name: 'Percent all 2015 hires, %',
        accessor: d => formatPercent(parseFloatClean(d['2015_hired_ct']) / totalHired, 1),
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
