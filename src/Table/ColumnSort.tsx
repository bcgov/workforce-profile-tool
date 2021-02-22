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
          <>&nbsp;&#9660;{/* Unicode: black down-pointing triangle */}</>
        ) : (
          <>&nbsp;&#9650;{/* Unicode: black up-pointing triangle */}</>
        )
      ) : (
        ''
      )}
    </span>
  )
}

export default ColumnSortIndicator
