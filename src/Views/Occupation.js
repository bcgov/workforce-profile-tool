import React, { Component } from 'react'
import OccupationTable from '../Table/OccupationTable'
import OccupationGraph from '../Graphs/OccupationGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

class Occupation extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Representation — Occupation'
    return (
      <div>
        <Title title={title} />
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
