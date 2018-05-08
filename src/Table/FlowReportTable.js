import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { displayNameByKey, shortDisplayNameByKey } from '../Variables/VariableList'

import { formatNumber, parseIntClean, parseFloatClean, formatPercent } from '../Services/formatter'

import './Table.css'
import './OccupationTable.css'

class FlowReportTable extends Component {
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

    const tables = Object.keys(dataMap).map(k => {
      let title = displayNameByKey('Des_Grp', k)
      let shortTitle = shortDisplayNameByKey('Des_Grp', k)
      return (
        <div key={k}>
          <h2>{title}</h2>
          <FlowReportSubTable data={dataMap[k]} shortTitle={shortTitle} />
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

class FlowReportSubTable extends Component {
  render () {
    const yearRows = this.props.data.filter(d => d['Type'].startsWith('Employed_'))
    const hiringRows = this.props.data.filter(d => d['Type'].startsWith('Hiring_'))
    const separationsRows = this.props.data.filter(d => d['Type'].startsWith('Separations_'))
    const promotionsRows = this.props.data.filter(d => d['Type'].startsWith('Promotions_'))

    const columns = [
      {
        id: 'Type',
        name: '',
        accessor: d => d['Display_Type'],
        headerClass: 'hide-sort'
      },
      {
        id: 'DesGrp_Count_Reg',
        name: this.props.shortTitle,
        accessor: d => parseIntClean(d['DesGrp_Count_Reg']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_Reg'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'NonDesGrp_Count_Reg',
        name: <span><span className='col-group-title'>REGULAR</span><br />{`Non-${this.props.shortTitle}`}</span>,
        accessor: d => parseIntClean(d['NonDesGrp_Count_Reg']),
        displayAccessor: d => formatNumber(d['NonDesGrp_Count_Reg'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Total_Count_Reg',
        name: 'Total',
        accessor: d => parseIntClean(d['Total_Count_Reg']),
        displayAccessor: d => formatNumber(d['Total_Count_Reg'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'DesGrp_Count_Aux',
        name: this.props.shortTitle,
        accessor: d => parseIntClean(d['DesGrp_Count_Aux']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_Aux'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'NonDesGrp_Count_Aux',
        name: <span><span className='col-group-title'>AUXILIARY</span><br />{`Non-${this.props.shortTitle}`}</span>,
        accessor: d => parseIntClean(d['NonDesGrp_Count_Aux']),
        displayAccessor: d => formatNumber(d['NonDesGrp_Count_Aux'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Total_Count_Aux',
        name: 'Total',
        accessor: d => parseIntClean(d['Total_Count_Aux']),
        displayAccessor: d => formatNumber(d['Total_Count_Aux'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table FlowReportTable row'>
        <div className='col'>
          { this.props.data &&
            <div>
              <h3>Yearly Change</h3>
              <Reactor.Table
                columns={columns}
                rows={yearRows}
                rowFilter={rowFilter}
              />
              <h3>Hiring</h3>
              <Reactor.Table
                columns={columns}
                rows={hiringRows}
                rowFilter={rowFilter}
              />
              <h3>Separations</h3>
              <Reactor.Table
                columns={columns}
                rows={separationsRows}
                rowFilter={rowFilter}
              />
              <h3>Promotions</h3>
              <Reactor.Table
                columns={columns}
                rows={promotionsRows}
                rowFilter={rowFilter}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default FlowReportTable
