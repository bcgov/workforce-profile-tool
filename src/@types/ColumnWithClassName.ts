import { Column } from 'react-table'

export type ColumnWithClassName<
  T extends Record<string, unknown>
> = Column<T> & {
  className?: string
}
