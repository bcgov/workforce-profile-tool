import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { formatNumber, parseIntClean } from '../Services/formatter'

import './Table.css'

class RegionTable extends Component {
  render () {
    if (!this.props.data) {
      return (<div><h1>Loading...</h1></div>)
    }

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.DesignatedMinority_Group] = dataMap[d.DesignatedMinority_Group] || []
      dataMap[d.DesignatedMinority_Group].push(d)
    })

    const tables = Object.keys(dataMap).sort().map(k => {
      return <RegionSubTable data={dataMap[k]} />
    })

    return (
      <div>
        {tables}
      </div>
    )
  }
}

class RegionSubTable extends Component {
  render () {
    console.log('this.props.data', this.props.data)

    let regionRows = []
    let totalRow = []

    if (this.props.data) {
      regionRows = this.props.data.filter(d => d['Variable_Type'] === 'Region')
      totalRow = this.props.data.filter(d => d['Variable_Type'] === 'Total')
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

export default RegionTable
