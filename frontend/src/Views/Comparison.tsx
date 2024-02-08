import { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { ComparisonRawData } from '../@types/DataTypes'
import { DataKeyEnum } from '../@types/DataKeyEnum'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'

const Comparison = (): JSX.Element => {
  const { setLockedVars, queryValues } = useDataManager()

  useEffect(() => setLockedVars({}), [])

  const { data, dataDictionary, isLoading, error } =
    useDataQuery<ComparisonRawData>(DataKeyEnum.Comparison)

  const ministry = displayNameByKey('Ministry_Key', queryValues.Ministry_Key)

  const columns: ColumnWithClassName<ComparisonRawData>[] = [
    {
      id: 'Des_Grp',
      Header: 'Designated Group',
      accessor: (d) => displayNameByKey('Des_Grp', d['Des_Grp']) || '',
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
    <GenericView
      data={data}
      error={error}
      isLoading={isLoading}
      title={'Comparison with Provincial Workforce'}
    >
      <ComparisonGraph
        data={data}
        dataDictionary={dataDictionary}
        ministry={queryValues.Ministry_Key}
        title={'Comparison with Provincial Workforce'}
      />
      <GenericTable
        data={data}
        dataDictionary={dataDictionary}
        columns={columns}
        filename={'comparison'}
      />
    </GenericView>
  )
}

export default Comparison
