import React, { Component } from 'react'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'

class Hiring extends Component {
  render () {
    const title = 'Indicators of Progress — Hiring'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <HiringGraph data={this.props.data} title={title} />
            <HiringTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Hiring
