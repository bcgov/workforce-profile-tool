import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import { formatNumber, formatPercent } from '../Services/formatter'

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
    const data = this.props.data.filter(
      (d) => !['AS_TOTAL', 'WOM_SM'].includes(d['Des_Grp'])
    )

    const total = this.props.data.find((d) => d['Des_Grp'] === 'AS_TOTAL')
    const totalHired = total ? +total['2018_hired_ct'] : 1

    const columns: ReactorTableColumn[] = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: (d) =>
          VARIABLE_MANAGER.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
      },
      {
        id: '2018_hired_ct',
        name: 'Hired, 2015 to 2018',
        accessor: (d) => formatNumber(d['2018_hired_ct']),
        cellClass: 'text-right',
        headerClass: 'text-right',
      },
      {
        id: 'percent_total',
        name: 'Percent of all hires',
        accessor: (d) => formatPercent(d['2018_hired_ct'], 1, totalHired),
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
                filename={'hiring'}
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
