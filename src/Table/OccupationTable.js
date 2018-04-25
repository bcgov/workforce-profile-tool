import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { formatNumber } from '../Services/formatter'

import './Table.css'

class OccupationTable extends Component {
  render () {
    console.log('this.props.data', this.props.data)

    const dataRows = this.props.data

    const columns = [
      {
        id: 'id',
        name: 'ID',
        cellClass: 'hidden',
        headerClass: 'hidden',
        accessor: d => ''.concat(Object.values(d)),
        displayAccessor: d => ''
      },
      {
        id: 'DesignatedMinority_Group',
        name: 'Des. Grp.',
        accessor: d => d['DesignatedMinority_Group']
      },
      {
        id: 'Occupation_Region_Group',
        name: 'Occupation',
        accessor: d => d['Occupation_Region_Group']
      },
      {
        id: 'DesGrp_Count_ORG',
        name: 'Des. Grp.',
        accessor: d => formatNumber(d['DesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'NonDesGrp_Count_ORG',
        name: 'Non-Des. Grp.',
        accessor: d => formatNumber(d['NonDesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Total_Count_ORG',
        name: 'Total',
        accessor: d => formatNumber(d['Total_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          { this.props.data &&
            <Reactor.Table
              columns={columns}
              rows={dataRows}
              rowFilter={rowFilter}
            />
          }
        </div>
      </div>
    )
  }
}

export default OccupationTable
