import React from 'react'

import { parseFloatClean } from '../Services/formatter'
import { useDataManager } from '../Data/DataManager'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import DownloadDataLink from './DownloadDataLink'
import FixTypeLater from '../@types/FixTypeLater'
import Table from './Table'

import './Table.scss'

const LeadershipTable = (): JSX.Element => {
  const { leadershipData: data } = useDataManager()

  const columns: FixTypeLater[] = [
    {
      accessor: (r: FixTypeLater) =>
        VARIABLE_MANAGER.displayNameByKey('Des_Grp', r['Des_Grp']),
      Header: 'Designated Group',
      id: 'Des_Grp',
    },
    {
      accessor: (r: FixTypeLater) => parseFloatClean(r['Executive']),
      className: 'text-right',
      Header: 'Executive Leadership, %',
    },
    {
      accessor: (r: FixTypeLater) => parseFloatClean(r['Management_Band']),
      className: 'text-right',
      Header: 'Management Band Leadership, %',
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
              filename={'leadership'}
              includeDefinitions={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadershipTable
