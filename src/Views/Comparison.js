import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import Loading from './Loading'
import NoData from './NoData'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeMinistry'

class Comparison extends Component {
  render () {
    const title = 'Comparison with Provincial Workforce'
    const filters = qs.parse(this.props.location.search)
    return (
      <div>
        <h1>{title}</h1>
        <h2>{activeMinistry(filters.Ministry_Key)}</h2>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <ComparisonGraph data={this.props.data} title={title} />
            <ComparisonTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Comparison)
