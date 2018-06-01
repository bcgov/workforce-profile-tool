import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import Tooltip from '../Core/Tooltip'
import Definitions from './Definitions'

import { displayNameByKey, shortDisplayNameByKey } from '../Variables/VariableList'

import { formatNumber, parseIntClean, parseFloatClean, formatPercent } from '../Services/formatter'

import './Table.css'
import './OccupationTable.css'

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

    const tables = Object.keys(dataMap).map(k => {
      let title = displayNameByKey('Des_Grp', k)
      let shortTitle = shortDisplayNameByKey('Des_Grp', k)
      return (
        <div key={k}>
          <h2>{title}</h2>
          <OccupationSubTable data={dataMap[k]} shortTitle={shortTitle} />
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
        id: 'Occupation_Region_Group',
        name: 'Occupation',
        accessor: d => d['Occupation_Region_Group']
      },
      {
        id: 'DesGrp_Count_ORG',
        name: this.props.shortTitle,
        accessor: d => parseIntClean(d['DesGrp_Count_ORG']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'NonDesGrp_Count_ORG',
        name: `Non-${this.props.shortTitle}`,
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
      },
      {
        id: 'DesGrp_Percent_ORG',
        name: `${this.props.shortTitle} as % of Total`,
        accessor: d => parseFloatClean(d['DesGrp_Percent_ORG']),
        displayAccessor: d => formatPercent(d['DesGrp_Percent_ORG'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'DesGrp_Percent_AvailableWorkforce',
        name: <span>
          {this.props.shortTitle} as % of Available Workforce
          &nbsp;<Tooltip text={`The representation of visible minorities in the BC Workforce according to Statistics Canada's 2011 National Household Survey. The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Public Service, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Public Service.`} />
        </span>,
        accessor: d => parseFloatClean(d['DesGrp_Percent_AvailableWorkforce']),
        displayAccessor: d => formatPercent(d['DesGrp_Percent_AvailableWorkforce'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'DesGrp_Count_Expected',
        name: <span>
          Expected # {this.props.shortTitle}
          &nbsp;<Tooltip text={`Shortfall numbers are only shown when the shortfall is equal to or greater than 30 employees or 20% of the expected number, where:
            <br />Expected Number = (Available Workforce Representation x Total in Occupation), and
            <br />Shortfall = Expected Number - Visible Minority.
            <br />Shortfall must be at least 2 to be considered a "significantly under-represented" occupation.</span>`} />
        </span>,
        accessor: d => parseIntClean(d['DesGrp_Count_Expected']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_Expected'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'DesGrp_Count_Shortfall',
        name: `Shortfall of ${this.props.shortTitle}`,
        accessor: d => parseIntClean(d['DesGrp_Count_Shortfall']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_Shortfall'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table OccupationTable row'>
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
              <Reactor.Table
                tableClass={'hide-header'}
                columns={columns}
                rows={[]}
                rowFilter={rowFilter}
                totalRows={totalRow}
              />
              <Definitions />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default OccupationTable
