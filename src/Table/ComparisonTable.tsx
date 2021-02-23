import React from 'react'
import Reactor from '@plot-and-scatter/reactor-table'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'

import { VARIABLES } from '../Variables/VariableManager'
import { formatPercent } from '../Services/formatter'

import './Table.scss'
import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { ComparisonRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import Loading from '../Views/Loading'
import Table from './Table'
import { StringParam, useQueryParam } from 'use-query-params'

const ComparisonTable = (): JSX.Element => {
  const { comparisonData: data } = useDataManager()

  const [ministryKey] = useQueryParam('Ministry_Key', StringParam)
  const ministry = VARIABLES.displayNameByKey('Ministry_Key', ministryKey) // TODO: cleaner implementation of this

  if (!data) return <Loading />

  const columns: ColumnWithClassName<ComparisonRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) =>
        VARIABLES.displayNameByKey('Des_Grp', d['Des_Grp']) || '',
    },
    {
      id: 'Employees_BCPS',
      Header: `${ministry}, %`,
      accessor: (d) => formatPercent(d['Employees_BCPS'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'Available_Workforce_BCPS',
      Header: 'Available Workforce, %',
      accessor: (d) => formatPercent(d['Available_Workforce_BCPS'], 1, 100),
      className: 'text-right',
    },
    {
      id: 'Employees_BC_Population',
      Header: 'BC Population, %',
      accessor: (d) => formatPercent(d['Employees_BC_Population'], 1, 100),
      className: 'text-right',
    },
  ]

  return (
    <div className="Table row">
      <div className="col">
        {data && (
          <div>
            <Table columns={columns} data={data} />
            <DownloadDataLink
              columns={columns}
              rows={data}
              filename={'comparison'}
            />
            <Definitions />
          </div>
        )}
      </div>
    </div>
  )
}

export default ComparisonTable
