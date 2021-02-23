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

const HiringTable = (): JSX.Element => {
  const { progressData: data, hiringTotal } = useDataManager()

  if (!data) return <Loading />

  const totalHired = hiringTotal

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
          <Table columns={columns} data={data} />
          <DownloadDataLink columns={columns} rows={data} filename={'hiring'} />
          <Definitions />
        </div>
      </div>
    </div>
  )
}

export default HiringTable
