import { Column } from 'react-table'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import Definitions from './Definitions'
import Dictionary from '../@types/Dictionary'
import DownloadDataLink from './DownloadDataLink'
import Loading from '../Views/Loading'
import Table from './Table'

import './Table.scss'

interface Props<T extends Dictionary<unknown>> {
  /** The table columns to use. */
  columns: ColumnWithClassName<T>[]
  /** The WFP data to show in a table. */
  data: T[] | undefined
  /** The data dictionary describing entries that need a tooltip. */
  dataDictionary: DataDictionaryEntry[]
  /** The filename to use when generating a CSV. If undefined, no CSV export
   * button will be shown.
   */
  filename?: string
  /** Should definitions for the suppressed values be shown below the table? */
  hideDefinitions?: boolean
  /** Should a footer be shown for this table? */
  showFooter?: boolean
}

/** A generic table for use throughout the app. Optionally includes a button to
 * download the data in CSV format. Will also optionally show definitions for
 * suppressed values below the table.
 */
const GenericTable = <T extends Dictionary<unknown>>({
  columns,
  data,
  dataDictionary,
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
            dataDictionary={dataDictionary}
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
