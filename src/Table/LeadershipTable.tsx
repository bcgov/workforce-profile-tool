import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import { formatPercent, parseFloatClean } from '../Services/formatter'
import DownloadDataLink from './DownloadDataLink'

import './Table.scss'
import FixTypeLater from '../@types/FixTypeLater'
import ReactorTableColumn from '../@types/ReactorTableColumn'

interface Props {
  data: FixTypeLater[]
}

class ComparisonTable extends Component<Props> {
  render(): JSX.Element {
    const columns: ReactorTableColumn[] = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: (d) =>
          VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
      },
      {
        id: 'Executive',
        name: 'Executive Leadership, %',
        accessor: (d) => parseFloatClean(d['Executive']),
        displayAccessor: (d) => formatPercent(d['Executive'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: 'Management_Band',
        name: 'Management Band Leadership, %',
        accessor: (d) => parseFloatClean(d['Management_Band']),
        displayAccessor: (d) => formatPercent(d['Management_Band'], 1, 100),
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
                rows={this.props.data}
                rowFilter={rowFilter}
              />
              <DownloadDataLink
                columns={columns}
                rows={this.props.data}
                filename={'leadership'}
                includeDefinitions={false}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ComparisonTable
