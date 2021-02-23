import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import Definitions from './Definitions'
import Dictionary from '../@types/Dictionary'
import DownloadDataLink from './DownloadDataLink'
import Loading from '../Views/Loading'
import Table from './Table'

import './Table.scss'

interface Props<T extends Dictionary<unknown>> {
  columns: ColumnWithClassName<T>[]
  data: T[] | undefined
  filename?: string
  hideDefinitions?: boolean
}

const GenericTable = <T extends Dictionary<unknown>>({
  columns,
  data,
  filename,
  hideDefinitions,
}: Props<T>): JSX.Element => {
  if (!data) return <Loading />

  return (
    <div className="Table row">
      <div className="col">
        <div>
          <Table columns={columns} data={data} />
          {filename && (
            <DownloadDataLink
              columns={columns}
              rows={data}
              filename={filename}
            />
          )}
          {!hideDefinitions && <Definitions />}
        </div>
      </div>
    </div>
  )
}

export default GenericTable
