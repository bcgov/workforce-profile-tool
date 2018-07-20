import React, { Component } from 'react'
import LeadershipTable from '../Table/LeadershipTable'
import LeadershipGraph from '../Graphs/LeadershipGraph'
import Loading from './Loading'
import NoData from './NoData'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeMinistry'

class Leadership extends Component {
  componentDidMount () {
    this.props.variableLockCallback(
      true,
      { Employee_Type: 'ALL', Ministry_Key: 'BCPS' }
    )
  }

  render () {
    const title = 'Leadership by Type'
    const filters = qs.parse(this.props.location.search)
    return (
      <div>
        <h1>{title}</h1>
        <h2>{activeMinistry(filters.Ministry_Key)}</h2>
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

export default withRouter(Leadership)
