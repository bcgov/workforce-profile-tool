import React, { Component } from 'react'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'
import Loading from './Loading'
import NoData from './NoData'

class Region extends Component {
  render () {
    const title = 'Representation — Region'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <RegionGraph data={this.props.data} title={title} />
            <RegionTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Region
