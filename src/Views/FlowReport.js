import React, { Component } from 'react'
import FlowReportTable from '../Table/FlowReportTable'
import FlowReportGraph from '../Graphs/FlowReportGraph'

class FlowReport extends Component {
  render () {
    return (
      <div>
        <h1>Representation — Flow Report</h1>
        <FlowReportGraph data={this.props.data} />
        <FlowReportTable data={this.props.data} />
      </div>
    )
  }
}

export default FlowReport
