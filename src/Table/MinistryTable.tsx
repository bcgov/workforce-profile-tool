import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { VARIABLES } from '../Variables/VariableManager'

import { formatNumber, parseIntClean } from '../Services/formatter'

import './Table.scss'
import FixTypeLater from '../@types/FixTypeLater'
import Dictionary from '../@types/Dictionary'
import ReactorTableColumn from '../@types/ReactorTableColumn'

interface Props {
  data: FixTypeLater[]
}

class MinistryTable extends Component<Props> {
  render(): JSX.Element {
    if (!this.props.data) return <div>&nbsp;</div>

    // Split the data
    const dataMap: Dictionary<any> = {}
    this.props.data.forEach((d) => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const tables = Object.keys(dataMap)
      .sort()
      .map((k) => {
        let title = (VARIABLES as FixTypeLater)
          .filter((v: FixTypeLater) => v.key === 'Des_Grp')[0]
          .options.filter((v: FixTypeLater) => v.key === k)[0].display
        title +=
          ' — ' +
          (VARIABLES as FixTypeLater)
            .filter((v: FixTypeLater) => v.key === 'Employee_Type')[0]
            .options.filter(
              (v: FixTypeLater) => v.key === this.props.data[0]['Employee_Type']
            )[0].display
        return (
          <div key={k}>
            <h2>{title}</h2>
            <MinistrySubTable data={dataMap[k]} />
          </div>
        )
      })

    return <div>{tables}</div>
  }
}

class MinistrySubTable extends Component<Props> {
  render(): JSX.Element {
    let regionRows = []
    let totalRow = []

    if (this.props.data) {
      regionRows = this.props.data.filter(
        (d) => d['Variable_Type'] === 'Ministry'
      )
      totalRow = this.props.data.filter((d) => d['Variable_Type'] === 'Total')
    }

    const columns: ReactorTableColumn[] = [
      {
        id: 'Des_Grp',
        name: 'Des. Grp.',
        accessor: (d) => d['Des_Grp'],
      },
      {
        id: 'Occupation_Ministry_Group',
        name: 'Occupation',
        accessor: (d) => d['Occupation_Ministry_Group'],
      },
      {
        id: 'DesGrp_Count_ORG',
        name: 'Des. Grp.',
        accessor: (d) => parseIntClean(d['DesGrp_Count_ORG']),
        displayAccessor: (d) => formatNumber(d['DesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: 'NonDesGrp_Count_ORG',
        name: 'Non-Des. Grp.',
        accessor: (d) => parseIntClean(d['NonDesGrp_Count_ORG']),
        displayAccessor: (d) => formatNumber(d['NonDesGrp_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: 'Total_Count_ORG',
        name: 'Total',
        accessor: (d) => parseIntClean(d['Total_Count_ORG']),
        displayAccessor: (d) => formatNumber(d['Total_Count_ORG']),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
    ]

    const rowFilter = () => true

    return (
      <div className="Table row">
        <div className="col">
          {this.props.data && (
            <div>
              <Reactor.Table
                columns={columns}
                rows={regionRows}
                rowFilter={rowFilter}
                totalRows={totalRow}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MinistryTable
