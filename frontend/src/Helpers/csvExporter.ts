import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { useDataManager, displayNameByKey } from '../Data/DataManager'
import { Definition, definitionsForYear } from '../Table/Definitions'

/** Helper function that converts an array of string arrays (i.e. rows and
 * columns) into a single string which can be saved as a CSV.
 * @param rows An array of string arrays. The inner string array contains the
 * row values, in order, e.g. ["1993", "0.3", "0.5"]. The outer array contains
 * all the individual row arrays. */
const _toCSVString = (rows: string[][]): string => {
  let content = ''

  rows.forEach((row) => {
    content += row.join(',') + '\n'
  })

  return content
}

/** Function to generate a string suitable for saving as a CSV from the supplied
 * rows.
 *
 * @param columns The table column definitions.
 * @param rows The data rows.
 * @param includeDefinitions Whether to include definitions of the suppressed
 * data (appended at the bottom of the CSV).
 */
export const useExportData = <T extends Record<string, unknown>>(
  columns: ColumnWithClassName<T>[],
  rows: T[],
  includeDefinitions = true,
  additionalDefinitions?: Definition[]
): string => {
  const { queryValues } = useDataManager()

  const columnRow = columns.map((c) => {
    let name = c.Header as JSX.Element | string

    if (typeof name === 'object') {
      // Special case for columns with HTML in them. In that case, c.name will
      // be an object, since such a column will actually be a React element. Any
      // children of that React element with a type of 'string' represent
      // column text, so we can just filter on those and join them together to
      // get the proper column text.
      name = name.props.title
    }

    return `"${name}"`
  })

  const mappedRows = rows.map((r) =>
    columns.map((c) => `"${(c.accessor as (datum: T) => string)(r)}"`)
  )

  let allRows = [columnRow]

  allRows = allRows.concat(mappedRows)

  if (includeDefinitions) {
    const definitions = definitionsForYear(queryValues.Year)
      .concat(additionalDefinitions || [])
      .map((item) => [item.term, `"${item.definition}"`])

    allRows = allRows.concat(definitions)
  }
  const filters = [["Active Filters"], ["Year", queryValues.Year]
    , ["Designated Group", queryValues.Des_Grp.map((k) => displayNameByKey('Des_Grp', k)).join('; ')]
    , ["Employee Type", displayNameByKey('Employee_Type', queryValues.Employee_Type)]
    , ["Organization", displayNameByKey('Ministry_Key', queryValues.Ministry_Key)]]
  allRows = [...allRows, ...filters]

  return _toCSVString(allRows)
}
