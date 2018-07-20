import React, { Component } from 'react'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

class Hiring extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Indicators of Progress — Hiring, 2015 to 2018'
    return (
      <div>
        <Title title={title} />
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
