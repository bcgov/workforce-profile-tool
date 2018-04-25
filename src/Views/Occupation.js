import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'

class Occupation extends Component {
  render () {
    return (
      <div>
        <h1>Occupation</h1>
        <OccupationTable data={this.props.data} />
      </div>
    )
  }
}

export default Occupation
