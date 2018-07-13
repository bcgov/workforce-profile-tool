import React, { Component } from 'react'
import { exportData } from '../Services/csvExporter'

class DownloadButton extends Component {
  download () {
    // Help from https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039
    const csvString = exportData(this.props.columns, this.props.rows, null, this.props.includeDefinitions)
    var blob = new window.Blob([csvString])
    if (window.navigator.msSaveOrOpenBlob) { // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, `${this.props.filename}.csv`)
    } else {
      var a = window.document.createElement('a')
      a.href = window.URL.createObjectURL(blob, {type: 'text/plain'})
      a.download = `${this.props.filename}.csv`
      document.body.appendChild(a)
      a.click()  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a)
    }
  }

  render () {
    return (
      <button className='btn btn-sm btn-primary' onClick={this.download.bind(this)}>
        <i className='fas fa-file-alt' />Export data to CSV
      </button>
    )
  }
}

export default DownloadButton
