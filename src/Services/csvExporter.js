import { DEFINITIONS } from '../Table/Definitions'

const _toCSVString = (rows) => {
  var content = ''

  rows.forEach(function (row, index) {
    content += row.join(',') + '\n'
  })

  return content
}

export const exportData = (columns, rows, title, includeDefinitions = true) => {
  const columnRow = columns.map(c => {
    let name = c.name
    if (typeof name === 'object') {
      // Special case for columns with HTML in them. In that case, c.name will
      // be an object, since such a column will actually be a React element. Any
      // children of that React element with a type of 'string' represent
      // column text, so we can just filter on those and join them together to
      // get the proper column text.
      name = name.props.children.filter(c => typeof c === 'string').join('')
    }
    return `"${name}"`
  })

  const mappedRows = rows.map(r => {
    return columns.map(c => {
      return c.displayAccessor ? `"${c.displayAccessor(r)}"` : `"${c.accessor(r)}"`
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
    const definitions = DEFINITIONS.map(item => [item.term, `"${item.definition}"`])
    allRows = allRows.concat(definitions)
  }

  // console.log('allrows', allRows)

  return _toCSVString(allRows)
}
