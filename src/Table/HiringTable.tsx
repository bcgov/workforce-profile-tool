import React from 'react'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'

import { VARIABLES } from '../Variables/VariableManager'
import { formatNumber, formatPercent } from '../Services/formatter'

import './Table.scss'
import { ProgressRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import Loading from '../Views/Loading'
import Table from './Table'
import { ColumnWithClassName } from '../@types/ColumnWithClassName'

const ProgressTable = (): JSX.Element => {
  const { progressData: data } = useDataManager()

  if (!data) return <Loading />

  // const totalRow = this.props.data.filter(d => d['Des_Grp'] === 'AS_TOTAL')
  // const totalRow = null
  const filteredData = data
    .filter((d) => !['AS_TOTAL', 'WOM_SM'].includes(d['Des_Grp']))
    .filter((d) => d.Ministry_Key === 'BCPS') // TODO: remove this
    .filter((d) => d.Employee_Type === 'ALL')

  const total = data.find(
    (d) =>
      d['Des_Grp'] === 'AS_TOTAL' &&
      d.Employee_Type === 'ALL' &&
      d.Ministry_Key === 'BCPS'
  )
  const totalHired = total ? +total['2018_hired_ct'] : 1

  const columns: ColumnWithClassName<ProgressRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (r) => VARIABLES.displayNameByKey('Des_Grp', r.Des_Grp) || '',
    },
    {
      id: '2018_hired_ct',
      Header: 'Hired, 2015 to 2018',
      accessor: (r) => formatNumber(r['2018_hired_ct']),
      className: 'text-right',
    },
    {
      id: 'percent_total',
      Header: 'Percent of all hires',
      accessor: (r) => formatPercent(r['2018_hired_ct'], 1, totalHired),
      className: 'text-right',
    },
  ]

  return (
    <div className="Table row">
      <div className="col">
        <div>
          <Table columns={columns} data={filteredData} />
          <DownloadDataLink
            columns={columns}
            rows={filteredData}
            filename={'hiring'}
          />
          <Definitions />
        </div>
      </div>
    </div>
  )
}

export default ProgressTable
