import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { DEFINITIONS } from '../Table/Definitions'

const _toCSVString = (rows: string[][]): string => {
  let content = ''

  rows.forEach((row) => {
    content += row.join(',') + '\n'
  })

  return content
}

export const exportData = <T extends Record<string, unknown>>(
  columns: ColumnWithClassName<T>[],
  rows: T[],
  includeDefinitions = true,
  columnPrefixes?: Record<string, string>
): string => {
  const columnRow = columns.map((c, index) => {
    let name = c.Header as JSX.Element | string
    if (typeof name === 'object') {
      // Special case for columns with HTML in them. In that case, c.name will
      // be an object, since such a column will actually be a React element. Any
      // children of that React element with a type of 'string' represent
      // column text, so we can just filter on those and join them together to
      // get the proper column text.
      name = name.props.title
    }
    // If there are prefixes, attach them
    if (columnPrefixes) {
      const prefix = columnPrefixes[index] || ''
      name = prefix + name
    }
    return `"${name}"`
  })

  const mappedRows = rows.map((r) =>
    columns.map((c) => `"${(c.accessor as (datum: T) => string)(r)}"`)
  )

  let allRows = [columnRow]

  allRows = allRows.concat(mappedRows)

  if (includeDefinitions) {
    const definitions = DEFINITIONS.map((item) => [
      item.term,
      `"${item.definition}"`,
    ])
    allRows = allRows.concat(definitions)
  }

  return _toCSVString(allRows)
}
