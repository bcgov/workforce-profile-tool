import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import Loading from '../Views/Loading'
import Table from './Table'

import './Table.scss'
import Dictionary from '../@types/Dictionary'

interface Props<T extends Dictionary<unknown>> {
  columns: ColumnWithClassName<T>[]
  data: T[] | undefined
  filename: string
}

const GenericTable = <T extends Dictionary<unknown>>({
  columns,
  data,
  filename,
}: Props<T>): JSX.Element => {
  if (!data) return <Loading />

  return (
    <div className="Table row">
      <div className="col">
        <div>
          <Table columns={columns} data={data} />
          <DownloadDataLink columns={columns} rows={data} filename={filename} />
          <Definitions />
        </div>
      </div>
    </div>
  )
}

export default GenericTable
