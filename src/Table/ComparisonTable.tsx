import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'

import { VARIABLES } from '../Variables/VariableManager'
import { formatPercent, parseFloatClean } from '../Services/formatter'

import './Table.scss'
import ReactorTableColumn from '../@types/ReactorTableColumn'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  data: FixTypeLater[]
  ministry: string
}

class ComparisonTable extends Component<Props> {
  render(): JSX.Element {
    const columns: ReactorTableColumn[] = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: (d) =>
          VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
      },
      {
        id: 'Employees_BCPS',
        name: `${this.props.ministry}, %`,
        accessor: (d) => parseFloatClean(d['Employees_BCPS']),
        displayAccessor: (d) => formatPercent(d['Employees_BCPS'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: 'Available_Workforce_BCPS',
        name: 'Available Workforce, %',
        accessor: (d) => parseFloatClean(d['Available_Workforce_BCPS']),
        displayAccessor: (d) =>
          formatPercent(d['Available_Workforce_BCPS'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: 'Employees_BC_Population',
        name: 'BC Population, %',
        accessor: (d) => parseFloatClean(d['Employees_BC_Population']),
        displayAccessor: (d) =>
          formatPercent(d['Employees_BC_Population'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
    ]

    const rowFilter = () => true

    return (
      <div className="Table row">
        <div className="col">
          {this.props.data && this.props.data.length && (
            <div>
              <Reactor.Table
                columns={columns}
                rows={this.props.data}
                rowFilter={rowFilter}
              />
              <DownloadDataLink
                columns={columns}
                rows={this.props.data}
                filename={'comparison'}
              />
              <Definitions />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ComparisonTable
