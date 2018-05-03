import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

import { formatNumber, parseIntClean } from '../Services/formatter'

import './Table.css'

class OccupationTable extends Component {
  render () {
    if (!this.props.data) {
      return (<div><h1>Loading...</h1></div>)
    }

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const tables = Object.keys(dataMap).sort().map(k => {
      let title = VARIABLE_MAPPING
        .filter(v => v.key === 'Des_Grp')[0]
        .options
        .filter(v => v.key === k)[0].display
      title += ' — ' + VARIABLE_MAPPING
        .filter(v => v.key === 'Employee_Type')[0]
        .options
        .filter(v => v.key === this.props.data[0]['Employee_Type'])[0].display
      return (
        <div key={k}>
          <h2>{title}</h2>
          <OccupationSubTable data={dataMap[k]} />
          <br />
          <br />
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

class OccupationSubTable extends Component {
  render () {
    const managementRows = this.props.data.filter(d => d['Occupation_Type'] === 'Management')
    const managementSubtotal = this.props.data.filter(d => d['Occupation_Type'] === 'SubTotal_Mngt')
    const nonManagementRows = this.props.data.filter(d => d['Occupation_Type'] === 'NonManagement')
    const nonManagementSubtotal = this.props.data.filter(d => d['Occupation_Type'] === 'SubTotal_NonMngt')
    const totalRow = this.props.data.filter(d => d['Occupation_Type'] === 'Total')

    const columns = [
      {
        id: 'Des_Grp',
        name: 'Des. Grp.',
        accessor: d => d['Des_Grp']
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
              <h3>Management</h3>
              <Reactor.Table
                columns={columns}
                rows={managementRows}
                rowFilter={rowFilter}
                totalRows={managementSubtotal}
              />
              <h3>Non-Management</h3>
              <Reactor.Table
                columns={columns}
                rows={nonManagementRows}
                rowFilter={rowFilter}
                totalRows={nonManagementSubtotal}
              />
              <h3>Total</h3>
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
