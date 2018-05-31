import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'
import OccupationGraph from '../Graphs/OccupationGraph'

class Occupation extends Component {
  render () {
    return (
      <div>
        <h1>Representation — Occupation</h1>
        <OccupationGraph data={this.props.data} />
        <OccupationTable data={this.props.data} />
      </div>
    )
  }
}

export default Occupation
