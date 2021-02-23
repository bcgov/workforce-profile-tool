import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { ComparisonRawData } from '../@types/DataTypes'
import { formatPercent } from '../Services/formatter'
import { StringParam, useQueryParam } from 'use-query-params'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'

const Comparison = (): JSX.Element => {
  const { comparisonData: data } = useDataManager()

  const [ministryKey] = useQueryParam('Ministry_Key', StringParam)
  const ministry = VARIABLES.displayNameByKey('Ministry_Key', ministryKey) // TODO: cleaner implementation of this

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
    <GenericView title={'Comparison with Provincial Workforce'} data={data}>
      <GenericTable data={data} columns={columns} filename={'comparison'} />
    </GenericView>
  )
}

export default Comparison
