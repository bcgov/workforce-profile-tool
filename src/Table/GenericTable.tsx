import React from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import Definitions from './Definitions'
import Dictionary from '../@types/Dictionary'
import DownloadDataLink from './DownloadDataLink'
import Loading from '../Views/Loading'
import Table from './Table'

import './Table.scss'
import { Column } from 'react-table'

interface Props<T extends Dictionary<unknown>> {
  columns: ColumnWithClassName<T>[]
  data: T[] | undefined
  filename?: string
  hideDefinitions?: boolean
  showFooter?: boolean
}

const GenericTable = <T extends Dictionary<unknown>>({
  columns,
  data,
  filename,
  hideDefinitions,
  showFooter,
}: Props<T>): JSX.Element => {
  if (!data) return <Loading />

  return (
    <div className="Table row">
      <div className="col">
        <div>
          <Table
            columns={columns as Column[]}
            data={data}
            showFooter={showFooter}
          />
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
