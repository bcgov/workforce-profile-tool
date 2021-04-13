import FixTypeLater from '../@types/FixTypeLater'
import { DEFINITIONS } from '../Table/Definitions'

const _toCSVString = (rows: FixTypeLater[]) => {
  let content = ''

  rows.forEach(function (row) {
    content += row.join(',') + '\n'
  })

  return content
}

export const exportData = (
  columns: FixTypeLater,
  rows: FixTypeLater,
  title: FixTypeLater,
  includeDefinitions = true,
  columnPrefixes?: FixTypeLater
): FixTypeLater => {
  const columnRow = columns.map((c: FixTypeLater, index: FixTypeLater) => {
    let name = c.Header
    if (typeof name === 'object') {
      // Special case for columns with HTML in them. In that case, c.name will
      // be an object, since such a column will actually be a React element. Any
      // children of that React element with a type of 'string' represent
      // column text, so we can just filter on those and join them together to
      // get the proper column text.
      name = name.props.children
        .filter((c: FixTypeLater) => typeof c === 'string')
        .join('')
    }
    // If there are prefixes, attach them
    if (columnPrefixes) {
      const prefix = columnPrefixes[index] || ''
      name = prefix + name
    }
    return `"${name}"`
  })

  const mappedRows = rows.map((r: FixTypeLater) => {
    return columns.map((c: FixTypeLater) => {
      return c.displayAccessor
        ? `"${c.displayAccessor(r)}"`
        : `"${c.accessor(r)}"`
    })
  })

  let allRows

  if (title) {
    allRows = [title].concat([columnRow])
  } else {
    allRows = [columnRow]
  }

  allRows = allRows.concat(mappedRows)

  if (includeDefinitions) {
    const definitions = DEFINITIONS.map((item) => [
      item.term,
      `"${item.definition}"`,
    ])
    allRows = allRows.concat(definitions)
  }

  // console.log('allrows', allRows)

  return _toCSVString(allRows)
}
