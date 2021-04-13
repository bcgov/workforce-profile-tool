import { Column } from 'react-table'
import FixTypeLater from './FixTypeLater'

export type ColumnWithClassNameAndFooter<
  T extends Record<string, unknown>
> = Column<T> & {
  className?: string
  Footer?: FixTypeLater
}
