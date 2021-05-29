import React, { Component } from 'react'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { exportData } from '../Helpers/csvExporter'
import IntentionalAny from '../@types/IntentionalAny'

interface Props<T extends Record<string, unknown>> {
  columns: ColumnWithClassName<T>[]
  rows: T[]
  includeDefinitions?: boolean
  columnPrefixes?: Record<string, string>
  filename: string
}

class DownloadButton<T extends Record<string, unknown>> extends Component<
  Props<T>
> {
  download(): void {
    // Help from https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039
    const csvString = exportData(
      this.props.columns,
      this.props.rows,
      this.props.includeDefinitions,
      this.props.columnPrefixes
    )
    const blob = new window.Blob([csvString])
    if ((window as IntentionalAny).navigator.msSaveOrOpenBlob) {
      // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, `${this.props.filename}.csv`)
    } else {
      const a = window.document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.type = 'text/csv'
      a.download = `${this.props.filename}.csv`
      document.body.appendChild(a)
      a.click() // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a)
    }
  }

  render(): JSX.Element {
    return (
      <button
        className="btn btn-sm btn-primary Shadow"
        onClick={this.download.bind(this)}
      >
        <i className="fas fa-file-alt" />
        Export data to CSV
      </button>
    )
  }
}

export default DownloadButton
