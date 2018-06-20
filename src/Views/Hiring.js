import React, { Component } from 'react'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'

class Hiring extends Component {
  render () {
    return (
      <div>
        <h1>Indicators of Progress — Hiring</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <HiringGraph data={this.props.data} />
            <HiringTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Hiring
