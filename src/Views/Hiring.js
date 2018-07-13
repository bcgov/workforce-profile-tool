import React, { Component } from 'react'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeMinistry'

class Hiring extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Indicators of Progress — Hiring'
    const filters = qs.parse(this.props.location.search)
    return (
      <div>
        <h1>{title}</h1>
        <h2>{activeMinistry(filters.Ministry_Key)}</h2>
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

export default withRouter(Hiring)
