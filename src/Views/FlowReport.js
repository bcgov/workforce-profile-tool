import React, { Component } from 'react'
import FlowReportTable from '../Table/FlowReportTable'
import FlowReportGraph from '../Graphs/FlowReportGraph'
import Loading from './Loading'

class FlowReport extends Component {
  render () {
    const title = 'Representation — Flow Report'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <FlowReportGraph data={this.props.data} title={title} />
            <FlowReportTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default FlowReport
