import React, { Component } from 'react'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'

class Region extends Component {
  render () {
    return (
      <div>
        <h1>Region</h1>
        <RegionGraph data={this.props.data} />
        <RegionTable data={this.props.data} />
      </div>
    )
  }
}

export default Region
