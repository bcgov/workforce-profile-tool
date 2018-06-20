import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'
import OccupationGraph from '../Graphs/OccupationGraph'
import Loading from './Loading'

class Occupation extends Component {
  render () {
    return (
      <div>
        <h1>Representation — Occupation</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <OccupationGraph data={this.props.data} />
            <OccupationTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Occupation
