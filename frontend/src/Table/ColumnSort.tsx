export interface Column {
  /** Is the column sorted at all? */
  isSorted?: boolean
  /** Is the column sorted in descending order? */
  isSortedDesc?: boolean
}

interface Props {
  /** Whether this column is sorted, and whether it is sorted descendingly. */
  column: Column
}

/** A column sort indicator for use on a table header. */
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
