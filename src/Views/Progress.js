import React, { Component } from 'react'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

class Progress extends Component {
  render () {

    console.log('this.props.data', this.props.data)

    return (
      <div>
        <h1>Progress</h1>
        <ProgressGraph data={this.props.data} />
        <ProgressTable data={this.props.data} />
      </div>
    )
  }
}

export default Progress
