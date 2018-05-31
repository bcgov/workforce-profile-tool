import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'

class Leadership extends Component {
  render () {
    return (
      <div>
        <h1>Leadership by Type</h1>
        <LeadershipGraph data={this.props.data} />
        <LeadershipTable data={this.props.data} />
      </div>
    )
  }
}

export default Leadership
