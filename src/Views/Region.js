import React, { Component } from 'react'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'
import Loading from './Loading'

class Region extends Component {
  render () {
    return (
      <div>
        <h1>Representation — Region</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <RegionGraph data={this.props.data} />
            <RegionTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Region
