import React, { Component } from 'react'

import FixTypeLater from '../@types/FixTypeLater'
import { exportData } from '../Services/csvExporter'

interface Props {
  columns: FixTypeLater
  rows: FixTypeLater
  includeDefinitions?: boolean
  columnPrefixes?: FixTypeLater
  filename: string
}

class DownloadButton extends Component<Props> {
  download(): void {
    // Help from https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039
    const csvString = exportData(
      this.props.columns,
      this.props.rows,
      null,
      this.props.includeDefinitions,
      this.props.columnPrefixes
    )
    const blob = new window.Blob([csvString])
    if ((window as FixTypeLater).navigator.msSaveOrOpenBlob) {
      // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, `${this.props.filename}.csv`)
    } else {
      const a = window.document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = `${this.props.filename}.csv`
      document.body.appendChild(a)
      a.click() // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a)
    }
  }

  render(): JSX.Element {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={this.download.bind(this)}
      >
        <i className="fas fa-file-alt" />
        Export data to CSV
      </button>
    )
  }
}

export default DownloadButton
