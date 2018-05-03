import React, { Component } from 'react'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

class Progress extends Component {
  render () {
    return (
      <div>
        <h1>Progress</h1>
        <ProgressGraph data={this.props.data} filterCount={this.props.filterCount} />
        <ProgressTable data={this.props.data} />
      </div>
    )
  }
}

export default Progress
