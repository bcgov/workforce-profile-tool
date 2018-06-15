import React, { Component } from 'react'
import MinistryGraph from '../Graphs/MinistryGraph'

class Ministry extends Component {
  render () {
    return (
      <div>
        <h1>Ministries</h1>
        <MinistryGraph data={this.props.data} />
        {/* <MinistryTable data={this.props.data} /> */}
      </div>
    )
  }
}

export default Ministry
