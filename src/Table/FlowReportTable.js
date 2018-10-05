import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'

import Tooltip from '../Core/Tooltip'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'

import { formatNumber, parseIntClean } from '../Services/formatter'

import stable from 'stable'

import './Table.css'
import './OccupationTable.css'

class FlowReportTable extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    const rowOrder = {
      'Employed_2015': 1,
      'Employed_2018': 2,
      'Hiring_Outside': 3,
      'Hiring_Other': 4,
      'Hiring_TotalNew': 5,
      'Hiring_AuxtoReg': 6,
      'Hiring_TotalReg': 7,
      'Separations_BCPS': 8,
      'Separations_Other': 9,
      'Separations_Total': 10,
      'Separations_AuxtoReg': 11,
      'Separations_TotalAux': 12,
      'Promotions_Same': 13,
      'Promotions_Other': 14,
      'Promotions_Total': 15
    }

    const groupOrder = { 'IND': 0, 'DIS': 1, 'VM': 2, 'WOM': 3 }

    // Sort the data
    const data = this.props.data
    if (data && data.length) {
      // Stable sort; JS implementation is not
      stable.inplace(data, (a, b) => rowOrder[a.Type] - rowOrder[b.Type])
      stable.inplace(data, (a, b) => groupOrder[a.Des_Grp] - groupOrder[b.Des_Grp])
    }

    // Split the data
    const dataMap = {}
    data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const tables = Object.keys(dataMap).map(k => {
      let title = VARIABLE_MANAGER.displayNameByKey('Des_Grp', k)
      let shortTitle = VARIABLE_MANAGER.shortDisplayNameByKey('Des_Grp', k)
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
        headerClass: 'text-right',
        sortable: false
      },
      {
        id: 'NonDesGrp_Count_Reg',
        name: <span><span className='col-group-title'>REGULAR</span><br />{`Non-${this.props.shortTitle}`}</span>,
        accessor: d => parseIntClean(d['NonDesGrp_Count_Reg']),
        displayAccessor: d => formatNumber(d['NonDesGrp_Count_Reg'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right',
        sortable: false
      },
      {
        id: 'Total_Count_Reg',
        name: <span>
          Total
          &nbsp;<Tooltip text={`Total includes all members of the population, including non-respondents and employees for whom there is no relevant demographic data available.`} />
        </span>,
        accessor: d => parseIntClean(d['Total_Count_Reg']),
        displayAccessor: d => formatNumber(d['Total_Count_Reg'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right',
        sortable: false
      },
      {
        id: 'DesGrp_Count_Aux',
        name: this.props.shortTitle,
        accessor: d => parseIntClean(d['DesGrp_Count_Aux']),
        displayAccessor: d => formatNumber(d['DesGrp_Count_Aux'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right',
        sortable: false
      },
      {
        id: 'NonDesGrp_Count_Aux',
        name: <span><span className='col-group-title'>AUXILIARY</span><br />{`Non-${this.props.shortTitle}`}</span>,
        accessor: d => parseIntClean(d['NonDesGrp_Count_Aux']),
        displayAccessor: d => formatNumber(d['NonDesGrp_Count_Aux'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right',
        sortable: false
      },
      {
        id: 'Total_Count_Aux',
        name: <span>
          Total
          &nbsp;<Tooltip text={`Total includes all members of the population, including non-respondents and employees for whom there is no relevant demographic data available.`} />
        </span>,
        accessor: d => parseIntClean(d['Total_Count_Aux']),
        displayAccessor: d => formatNumber(d['Total_Count_Aux'], ''),
        cellClass: 'text-right',
        headerClass: 'text-right',
        sortable: false
      }
    ]

    const rowFilter = (r) => true

    const columnPrefixes = ['',
      'Regular – ', 'Regular – ', 'Regular – ',
      'Auxiliary – ', 'Auxiliary – ', 'Auxiliary – '
    ]

    const allRows = yearRows
      .concat(hiringRows)
      .concat(separationsRows)
      .concat(promotionsRows)

    return (
      <div className='Table FlowReportTable row'>
        <div className='col'>
          { this.props.data &&
            <div>
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
                tableClass={'hiring'}
              />
              <h3>Separations</h3>
              <Reactor.Table
                columns={columns}
                rows={separationsRows}
                rowFilter={rowFilter}
                tableClass={'separations'}
              />
              <h3>Promotions</h3>
              <Reactor.Table
                columns={columns}
                rows={promotionsRows}
                rowFilter={rowFilter}
                tableClass={'promotions'}
              />
              <DownloadDataLink
                columns={columns}
                columnPrefixes={columnPrefixes}
                rows={allRows}
                filename={'flow-report'}
              />
            </div>
          }
          <Definitions />
        </div>
      </div>
    )
  }
}

export default FlowReportTable
