import { useEffect } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { DataKeyEnum } from '../@types/DataKeyEnum'
import { displayNameByKey } from '../Data/DataManager'
import { formatPercent } from '../Helpers/formatter'
import { LeadershipRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'
import GenericTable from '../Table/GenericTable'
import GenericView from './GenericView'
import LeadershipGraph from '../Graphs/LeadershipGraph'

const Leadership = (): JSX.Element => {
  const { setLockedVars, year } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => {
    if (year === '2018') {
      setLockedVars({ Employee_Type: ['ALL'], Ministry_Key: ['BCPS'] })
    } else {
      setLockedVars({ Ministry_Key: ['BCPS'] })
    }
  }, [year])

  const { data, dataDictionary, isLoading, error } =
    useDataQuery<LeadershipRawData>(DataKeyEnum.Leadership)

  const columns: ColumnWithClassName<LeadershipRawData>[] = [
    {
      accessor: (r) => displayNameByKey('Des_Grp', r.Des_Grp),
      Header: 'Designated Group',
      id: 'Des_Grp',
    },
    {
      id: 'Executive',
      accessor: (r) => formatPercent(r.Executive, 1, 100),
      Header: 'Executive Leadership, %',
      className: 'text-end',
    },
    {
      id: 'Management_Band',
      accessor: (r) => formatPercent(r.Management_Band, 1, 100),
      className: 'text-end',
      Header: 'Management Band Leadership, %',
    },
  ]

  return (
    <GenericView
      isLoading={isLoading}
      error={error}
      data={data}
      title={'Leadership by Type'}
    >
      <LeadershipGraph
        data={data}
        dataDictionary={dataDictionary}
        title={'Leadership by Type'}
      />
      <GenericTable
        data={data}
        dataDictionary={dataDictionary}
        columns={columns}
        filename="leadership"
      />
    </GenericView>
  )
}

export default Leadership
