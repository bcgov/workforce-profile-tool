import { Column } from 'react-table'
import FixTypeLater from './FixTypeLater'

export type ColumnWithClassName<
  T extends Record<string, unknown>
> = Column<T> & {
  className?: string
}

export type ColumnWithClassNameandFooter<
  T extends Record<string, unknown>
> = Column<T> & {
  className?: string
  Footer?: FixTypeLater
}
