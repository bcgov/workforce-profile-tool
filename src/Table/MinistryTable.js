import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

import { formatNumber, parseIntClean } from '../Services/formatter'

import './Table.css'

class MinistryTable extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const tables = Object.keys(dataMap).sort().map(k => {
      let title = VARIABLE_MANAGER
        .filter(v => v.key === 'Des_Grp')[0]
        .options
        .filter(v => v.key === k)[0].display
      title += ' — ' + VARIABLE_MANAGER
        .filter(v => v.key === 'Employee_Type')[0]
        .options
        .filter(v => v.key === this.props.data[0]['Employee_Type'])[0].display
      return (
        <div>
          <h2>{title}</h2>
          <MinistrySubTable data={dataMap[k]} />
        </div>
      )
    })

    return (
      <div>
        {tables}
      </div>
    )
  }
}

class MinistrySubTable extends Component {
  render () {
    let regionRows = []
    let totalRow = []

    if (this.props.data) {
      regionRows = this.props.data.filter(d => d['Variable_Type'] === 'Ministry')
      totalRow = this.props.data.filter(d => d['Variable_Type'] === 'Total')
    }

    const columns = [
      {
        id: 'Des_Grp',
        name: 'Des. Grp.',
        accessor: d => d['Des_Grp']
      },
      {
        id: 'Occupation_Ministry_Group',
        name: 'Occupation',
        accessor: d => d['Occupation_Ministry_Group']
      },
      {
        id: 'DesGrp_Count_ORG',
        name: 'Des. Grp.',
        accessor: d => parseIntClean(d['DesGrp_Count_ORG']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'NonDesGrp_Count_ORG',
        name: 'Non-Des. Grp.',
        accessor: d => parseIntClean(d['NonDesGrp_Count_ORG']),
        displayAccessor: d => formatNumber(d['NonDesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Total_Count_ORG',
        name: 'Total',
        accessor: d => parseIntClean(d['Total_Count_ORG']),
        displayAccessor: d => formatNumber(d['Total_Count_ORG']),
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
                rows={regionRows}
                rowFilter={rowFilter}
                totalRows={totalRow}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default MinistryTable
