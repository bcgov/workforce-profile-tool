import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import Loading from './Loading'

class Leadership extends Component {
  render () {
    return (
      <div>
        <h1>Leadership by Type</h1>
        {!this.props.data && <Loading />}
        {this.props.data &&
          <div>
            <LeadershipGraph data={this.props.data} />
            <LeadershipTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default Leadership
