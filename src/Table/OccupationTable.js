import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { formatNumber, parseIntClean } from '../Services/formatter'

import './Table.css'

class OccupationTable extends Component {
  render () {
    console.log('this.props.data', this.props.data)

    let managementRows = []
    let managementSubtotal = []
    let nonManagementRows = []
    let nonManagementSubtotal = []
    let totalRow = []

    if (this.props.data) {
      managementRows = this.props.data.filter(d => d['Occupation_Type'] === 'Management')
      managementSubtotal = this.props.data.filter(d => d['Occupation_Type'] === 'SubTotal_Mngt')
      nonManagementRows = this.props.data.filter(d => d['Occupation_Type'] === 'NonManagement')
      nonManagementSubtotal = this.props.data.filter(d => d['Occupation_Type'] === 'SubTotal_NonMngt')
      totalRow = this.props.data.filter(d => d['Occupation_Type'] === 'Total')
    }

    const columns = [
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
              <h2>Management</h2>
              <Reactor.Table
                columns={columns}
                rows={managementRows}
                rowFilter={rowFilter}
                totalRows={managementSubtotal}
              />
              <h2>Non-Management</h2>
              <Reactor.Table
                columns={columns}
                rows={nonManagementRows}
                rowFilter={rowFilter}
                totalRows={nonManagementSubtotal}
              />
              <h2>Total</h2>
              <Reactor.Table
                tableClass={'hide-header'}
                columns={columns}
                rows={[]}
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

export default OccupationTable
