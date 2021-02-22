import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'

import { VARIABLES } from '../Variables/VariableManager'
import { formatPercent, parseFloatClean } from '../Services/formatter'

import './Table.scss'
import FixTypeLater from '../@types/FixTypeLater'
import ReactorTableColumn from '../@types/ReactorTableColumn'

interface Props {
  data: FixTypeLater[]
}

class ProgressTable extends Component<Props> {
  render(): JSX.Element {
    if (!this.props.data) return <div>&nbsp;</div>

    // const totalRow = this.props.data.filter(d => d['Des_Grp'] === 'AS_TOTAL')
    const totalRow = null
    const data = this.props.data.filter((d) => d['Des_Grp'] !== 'AS_TOTAL')

    const columns: ReactorTableColumn[] = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: (d) =>
          VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
      },
      {
        id: '2015_pc',
        name: '2015, %',
        accessor: (d) => parseFloatClean(d['2015_pc']),
        displayAccessor: (d) => formatPercent(d['2015_pc'], 1, 100),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: '2018_pc',
        name: '2018, %',
        accessor: (d) => parseFloatClean(d['2018_pc']),
        displayAccessor: (d) => formatPercent(d['2018_pc'], 1, 100),
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
                rows={data}
                totalRows={totalRow}
                rowFilter={rowFilter}
              />
              <DownloadDataLink
                columns={columns}
                rows={data}
                filename={'progress'}
              />
              <Definitions />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ProgressTable
