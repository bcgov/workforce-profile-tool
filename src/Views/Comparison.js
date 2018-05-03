import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'

class Comparison extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    return (
      <div>
        <h1>Comparison</h1>
        <ComparisonGraph data={this.props.data} />
        <ComparisonTable data={this.props.data} />
      </div>
    )
  }
}

export default Comparison
