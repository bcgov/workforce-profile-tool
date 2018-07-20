import React, { Component } from 'react'
import RegionGraph from '../Graphs/RegionGraph'
import RegionTable from '../Table/RegionTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

class Region extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Representation — Region'
    return (
      <div>
        <Title title={title} />
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
