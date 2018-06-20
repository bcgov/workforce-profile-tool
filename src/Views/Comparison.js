import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import Loading from './Loading'

class Comparison extends Component {
  render () {
    return (
      <div>
        <h1>Comparison with Provincial Workforce</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <ComparisonGraph data={this.props.data} />
            <ComparisonTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Comparison
