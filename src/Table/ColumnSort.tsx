import React from 'react'

export interface Column {
  isSorted?: boolean
  isSortedDesc?: boolean
}

interface Props {
  column: Column
}

const ColumnSortIndicator = ({ column }: Props): JSX.Element => {
  return (
    <div className="ml-1">
      {column.isSorted ? (
        column.isSortedDesc ? (
          <i className="fas fa-caret-down" />
        ) : (
          <i className="fas fa-caret-up" />
        )
      ) : (
        <i className="fas fa-sort" />
      )}
    </div>
  )
}

export default ColumnSortIndicator
