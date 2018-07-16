import React, { Component } from 'react'
import ComparisonTable from '../Table/ComparisonTable'
import ComparisonGraph from '../Graphs/ComparisonGraph'
import Loading from './Loading'
import NoData from './NoData'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeMinistry'

class Comparison extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Comparison with Provincial Workforce'
    const filters = qs.parse(this.props.location.search)
    const ministry = activeMinistry(filters.Ministry_Key)
    return (
      <div>
        <h1>{title}</h1>
        <h2>{ministry}</h2>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <ComparisonGraph data={this.props.data} title={title} ministry={ministry} />
            <ComparisonTable data={this.props.data} ministry={ministry} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Comparison)
