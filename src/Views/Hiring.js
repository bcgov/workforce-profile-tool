import React, { Component } from 'react'
import HiringGraph from '../Graphs/HiringGraph'
// import HiringTable from '../Table/HiringTable'

class Hiring extends Component {
  render () {
    return (
      <div>
        <h1>Hiring</h1>
        <HiringGraph data={this.props.data} />
        {/* <HiringTable data={this.props.data} /> */}
      </div>
    )
  }
}

export default Hiring
