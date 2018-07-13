import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import Loading from './Loading'
import NoData from './NoData'

class Leadership extends Component {
  componentDidMount () {
    this.props.variableLockCallback(true)
  }

  render () {
    const title = 'Leadership by Type'
    return (
      <div>
        <h1>{title}</h1>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <LeadershipGraph data={this.props.data} title={title} />
            <LeadershipTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Leadership
