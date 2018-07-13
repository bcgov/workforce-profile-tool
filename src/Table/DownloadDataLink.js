import React, { Component } from 'react'
import { exportData } from '../Services/csvExporter'

class DownloadButton extends Component {
  render () {
    const downloadLink = exportData(
      this.props.columns,
      this.props.rows,
      null,
      this.props.includeDefinitions
    )
    const filename = `${this.props.filename}.csv`
    return (
      <a href={downloadLink} download={filename} className='btn btn-sm btn-primary'>
        <i className='fas fa-file-alt' />Export data to CSV
      </a>
    )
  }
}

export default DownloadButton
