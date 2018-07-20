import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

class Leadership extends Component {
  componentDidMount () {
    this.props.variableLockCallback({
      Employee_Type: 'ALL', Ministry_Key: 'BCPS'
    })
  }

  render () {
    const title = 'Leadership by Type'
    return (
      <div>
        <Title title={title} />
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
