import React, { Component } from 'react'
import FlowReportTable from '../Table/FlowReportTable'
import FlowReportGraph from '../Graphs/FlowReportGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

class FlowReport extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Representation — Flow Report'
    return (
      <div>
        <Title title={title} />
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
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
