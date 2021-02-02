import FixTypeLater from './FixTypeLater'

type ReactorTableColumn = {
  id: string
  name: React.ReactNode
  accessor: (d: FixTypeLater) => string | number
  displayAccessor?: (d: FixTypeLater) => React.ReactNode
  cellClass?: string
  headerClass?: string
  sortable?: boolean
}

export default ReactorTableColumn
