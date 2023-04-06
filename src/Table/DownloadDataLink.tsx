import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { useExportData } from '../Helpers/csvExporter'

interface Props<T extends Record<string, unknown>> {
  columns: ColumnWithClassName<T>[]
  rows: T[]
  includeDefinitions?: boolean
  filename: string
}

const DownloadButton = <T extends Record<string, unknown>>({
  columns,
  rows,
  includeDefinitions,
  filename,
}: Props<T>): JSX.Element => {
  const csvString = useExportData(columns, rows, includeDefinitions)

  const download = (): void => {
    // Help from https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039

    const blob = new window.Blob([csvString])
    const a = window.document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.type = 'text/csv'
    a.download = `${filename}.csv`
    document.body.appendChild(a)
    a.click() // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a)
    // }
  }

  return (
    <button className="btn btn-sm btn-primary Shadow" onClick={download}>
      <i className="fas fa-file-alt" />
      Export data to CSV
    </button>
  )
}

export default DownloadButton
