import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'
import OccupationGraph from '../Graphs/OccupationGraph'
import Loading from './Loading'
import NoData from './NoData'

class Occupation extends Component {
  render () {
    const title = 'Representation — Occupation'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <OccupationGraph data={this.props.data} title={title} />
            <OccupationTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Occupation
