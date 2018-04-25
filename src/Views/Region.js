import React, { Component } from 'react'
import RegionTable from '../Table/RegionTable'

class Region extends Component {
  render () {
    return (
      <div>
        <h1>Region</h1>
        <RegionTable data={this.props.data} />
      </div>
    )
  }
}

export default Region
