import React from 'react'

export interface Column {
  isSorted?: boolean
  isSortedDesc?: boolean
}

interface Props {
  column: Column
}

const ColumnSortIndicator = (props: Props): JSX.Element => {
  const { column } = props
  return (
    <span>
      {column.isSorted ? (
        column.isSortedDesc ? (
          <>&blacktriangledown;</>
        ) : (
          <>&blacktriangleup;</>
        )
      ) : (
        ''
      )}
    </span>
  )
}

export default ColumnSortIndicator
