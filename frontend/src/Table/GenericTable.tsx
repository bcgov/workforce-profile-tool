import { Column } from 'react-table'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import { useDataManager } from '../Data/DataManager'
import Definitions, { Definition } from './Definitions'
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
  /** Are there any additional definitions for this table? */
  additionalDefinitions?: Definition[]
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
  additionalDefinitions,
}: Props<T>): JSX.Element => {
  const { queryValues } = useDataManager()

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
              // filename includes filters
              // YYYY-Organization-EmployeeType-DesignatedGroup
              filename={`${queryValues.Year}-${queryValues.Ministry_Key}-${queryValues.Employee_Type}-${queryValues.Des_Grp.join('_').replace('2SLGBTQ', '2SLGBTQ+')}-${filename}`}
              additionalDefinitions={additionalDefinitions}
            />
          )}
          {!hideDefinitions && (
            <Definitions additionalDefinitions={additionalDefinitions} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GenericTable
