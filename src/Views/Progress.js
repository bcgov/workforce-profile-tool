import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import qs from '../Services/query-string'
import { activeMinistry } from '../Services/activeMinistry'
import ProgressGraph from '../Graphs/ProgressGraph'
import ProgressTable from '../Table/ProgressTable'

import Loading from './Loading'
import NoData from './NoData'

class Progress extends Component {
  componentDidMount () {
    this.props.variableLockCallback(false)
  }

  render () {
    const title = 'Indicators of Progress — By Designated Group'
    const filters = qs.parse(this.props.location.search)
    return (
      <div>
        <h1>{title}</h1>
        <h2>{activeMinistry(filters.Ministry_Key)}</h2>
        {!this.props.data && <Loading />}
        {this.props.data && this.props.data.length === 0 && <NoData />}
        {this.props.data && this.props.data.length > 0 &&
          <div>
            <ProgressGraph data={this.props.data} title={title} />
            <ProgressTable data={this.props.data} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Progress)
