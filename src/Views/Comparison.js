import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import Loading from './Loading'
import NoData from './NoData'

class Comparison extends Component {
  render () {
    const title = 'Comparison with Provincial Workforce'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <ComparisonGraph data={this.props.data} title={title} />
            <ComparisonTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Comparison
